import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InvoiceLoginDto } from './dtos/invoiceLogin.dto';
import { Cache } from 'cache-manager';
import * as path from 'path';
import * as fs from 'fs';
import { firstValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtUser } from 'src/guards/jwt.strategy';
import { InvoiceService } from '../invoice/invoice.service';
import { execaSync } from 'execa';

const baseURL = 'https://id.eta.gov.eg/';
const baseDoc = 'https://api.invoicing.eta.gov.eg/';

@Injectable()
export class IntegrationService {
  constructor(
    private http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly invoiceService: InvoiceService,
  ) {}
  async invoiceLogin(invoiceLogin: InvoiceLoginDto) {
    try {
      await firstValueFrom(
        this.http
          .post('https://id.eta.gov.eg/connect/token', invoiceLogin, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            timeout: 5000,
          })
          .pipe(
            map((response) => {
              if (response.status === 200) {
                // save login data to session
                this.storeToken(12, response.data.token);
                return response.data;
              }
            }),
          ),
      );
    } catch (error) {
      console.error('Error during invoice login:', error.response.data);
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
    const token = await this.getToken(id);
    // using exica generate signiture
    await this.generateSigniture(document, 'pin', 'certificate');

    // call integration service

    try {
      console.log('start sending request ................');
      const docs = await this.requireUncached(
        path.join(__dirname, '/', 'FullSignedDocument.json'),
      );
      // return res.send(docs)
      const sub = await firstValueFrom(
        this.http
          .post(
            'https://api.invoicing.eta.gov.eg/api/v1.0/documentsubmissions',
            docs,
            {
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                Authorization: 'Bearer ' + token,
              },
            },
          )
          .pipe(
            map((response) => {
              if (response.status === 200) {
                // save login data to session
                return response;
              }
            }),
          ),
      );
            return sub;
            // return res.status(201).json(sub.data)
            // update Invoice status
            // check submission status ...
          //  await this.invoiceService.update(id,{status:'InvoiceStatus'})
    } catch (error) {
      console.log('caaaatche', error.response.data.error);
      // return res.status(400).json(error.response.data)
    }

  }

  async generateSigniture(doc: any, pin: string, certificate: string) {
    try {
      const ps = await execaSync(
        path.join(__dirname, '../../lib/', 'EInvoicingSigner.exe'),
        [path.join(__dirname), pin, certificate, JSON.stringify(doc)],
      );
      console.log('while token generating......', ps.exitCode);
      // return res.send(ps)
      if (ps.exitCode == 0 && ps.stderr === '') {
        return 1;
      }
      return 0;
    } catch (error) {
      console.log('errrrrrrrrror', error);
      return 0;
    }
  }

  async storeToken(key: number, value: string) {
    await this.cacheManager.set('id_' + key, value);
  }

  async getToken(id: number) {
    const key = 'id_'+id;
    return (await this.cacheManager.get(key)) ?? false;
  }
}
