import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceLoginDto } from './dtos/invoiceLogin.dto';
import { Cache } from 'cache-manager';
import * as path from 'path';
import * as fs from 'fs';
import { firstValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtUser } from 'src/guards/jwt.strategy';
import { InvoiceService } from '../invoice/invoice.service';
// import { execaSync } from 'execa';
import { spawn, execFile, execFileSync } from 'child_process';
import { InvoiceStatus } from 'src/enums/invoice.enum';

const baseURL = 'https://id.eta.gov.eg/';
const baseDoc = 'https://api.invoicing.eta.gov.eg/';

@Injectable()
export class IntegrationService {
  constructor(
    private http: HttpService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly invoiceService: InvoiceService,
  ) { }

  async invoiceLogin(data: InvoiceLoginDto) {
    console.log('====================================');
    console.log('start invoice login');
    console.log('====================================');
    try {
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      const loginBody = {
        client_id: data.client_id,
        client_secret: data.client_secret,
        grant_type: "client_credentials",
        scope: "InvoicingAPI"
      }

      return await firstValueFrom(
        this.http
          .post('https://id.eta.gov.eg/connect/token', loginBody, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            timeout: 5000,
          })
          .pipe(
            map((response) => {
              if (response.status === 200) {
                // save login data to session key:value
                // this.storeToken(user.id, response.data.token);
                console.log(response?.data)
                return response.data?.access_token;
              }
            }),
          ),
      );
    } catch (error) {
      console.error('Error during invoice login:', error?.response);
      throw new BadRequestException(error?.response?.data);
    }
  }

  requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
  }

  // generate signiture
  async sendInvoice(id: number, user: JwtUser) {
    // get invoice by id
    const document = await this.invoiceService.findOne(id);
console.log(document)
    // const token = await this.getToken(user.id);
    // if token expired or empty re-try login
    // if(!token) await this.invoiceLogin({user})
    // using exica generate signiture
    await this.generateSigniture(document, user.pin, user.certificate, user.dllLibPath);

    // call integration service

    try {
      console.log('start sending request ................');
      const docs = await this.requireUncached(
        path.join(process.cwd(), 'src/modules/integration', 'FullSignedDocument.json'),
      );
      // return res.send(docs)
      const docSub = await firstValueFrom(
        this.http
          .post(
            'https://api.invoicing.eta.gov.eg/api/v1.0/documentsubmissions',
            docs,
            {
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: 'Bearer ' + user.access_token,
              },
            },
          )
          .pipe(
            map((response) => {
              if (response?.status === 200) {
                // save login data to session
                console.log("sent results ???",response)
                return response;
              }
            }),
          ),
      );
console.log("final for submit",docSub)
      // return sub;
      // return res.status(201).json(sub.data)
      // update Invoice status
      // check submission status ...
      return await this.invoiceService.update(id, { status: InvoiceStatus.ACCEPTED })
    } catch (error) {
      console.log('caaaatche', error.response.data.error);
      // return res.status(400).json(error.response.data)
    }
  }

  async generateSigniture(doc: any, pin: string, certificate: string, lib = 'eps2003csp11.dll') {
    try {
      console.log(lib);
      const out = execFileSync(
        path.join(
          process.cwd(),
          'lib/bin/Debug/netcoreapp3.1',
          'EInvoicingSigner.exe',
        ),
        [
          path.join(process.cwd(), 'src/modules/integration'),
          pin,
          certificate,
          JSON.stringify(doc),
          lib
        ]
      );
      const responce = await out.toString('utf-8')
      return responce
    } catch (error) {
      console.log("generate", error.message.toString())
      throw new NotFoundException('generate signature', error)
    }
  }

  async storeToken(key: string, value: string) {
    // await this.cacheManager.set('id_' + key, value);
  }

  async getToken(id: string) {
    const key = 'id_' + id;
    // return (await this.cacheManager.get(key)) ?? false;
  }
}
