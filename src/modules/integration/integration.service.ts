import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InvoiceLoginDto } from './dtos/invoiceLogin.dto';
import * as path from 'path';
import { firstValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
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
  ) {}

  async invoiceLogin(data: InvoiceLoginDto) {
    try {
      const loginBody = {
        client_id: data.client_id,
        client_secret: data.client_secret,
        grant_type: 'client_credentials',
        scope: 'InvoicingAPI',
      };

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
                return response.data?.access_token;
              }
            }),
          ),
      );
    } catch (error) {
      throw new BadRequestException('error  api login');
    }
  }

  requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
  }

  // generate signiture
  async sendInvoice(id: number, user: JwtUser) {
    const document = await this.invoiceService.findOne(id);
    await this.generateSigniture(
      document,
      user.pin,
      user.certificate,
      user.dllLibPath,
    );

    try {
      console.log('start sending request ................');
      const docs = await this.requireUncached(
        path.join(
          process.cwd(),
          'src/modules/integration',
          'FullSignedDocument.json',
        ),
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
              // console.log('sent results0000000000 ???', response);
              return response;
            }),
          ),
      );
      if (docSub.data.acceptedDocuments.length) {
        const updateDb = await this.invoiceService.update(
          { id: id },
          {
            status: InvoiceStatus.ACCEPTED,
            uuid: docSub.data.acceptedDocuments[0].uuid,
            submissionId: docSub.data.acceptedDocuments[0].longId,
          },
        );
      }
      return docSub.data;
    } catch (error) {
      // console.log('cant sent invoice', error.response);
      // return res.status(400).json(error.response.data)
      throw new BadRequestException('cant sent invoice', error.response?.data);
    }
  }

  async generateSigniture(
    doc: any,
    pin: string,
    certificate: string,
    lib = 'SignatureP11.dll',
  ) {
    try {
      // console.log({
      //   pin,
      //   certificate,
      //   lib,
      //   doc,
      // });
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
          lib,
        ],
      );
      const responce = await out.toString('utf-8');
      return responce;
    } catch (error) {
      // console.log('error in generate', error.message.toString());
      // throw new NotFoundException('cant generate signature', error);
      throw new BadRequestException('cant generate signature', error.message);
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
