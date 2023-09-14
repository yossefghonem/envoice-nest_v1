import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InvoiceLoginDto } from './dtos/invoiceLogin.dto';
import { Cache } from 'cache-manager';
import * as path from 'path';
import * as fs from 'fs';
import {  firstValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtUser } from 'src/guards/jwt.strategy';
import { InvoiceService } from '../invoice/invoice.service';
import {execaSync} from 'execa'


const baseURL = 'https://id.eta.gov.eg/';
const baseDoc = 'https://api.invoicing.eta.gov.eg/';

@Injectable()
export class IntegrationService {
  constructor(
    private http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly invoiceService:InvoiceService
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
                this.storeToken('token', response.data.token);
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

  // generate signiture
  async sendInvoice(id: number, user: JwtUser) {
    // get invoice by id
    const document=await this.invoiceService.findOne(id)

    // using exica generate signiture
    await this.generateSigniture(document)
  }

  async generateSigniture(doc:any){
    try {
      const ps = await execaSync(path.join(__dirname, "../../lib/", 'EInvoicingSigner.exe'),
          [path.join(__dirname), 'pin', "Egypt Trust Sealing CA", JSON.stringify(doc)]
      );
      console.log("while token generating......", ps.exitCode);
      // return res.send(ps)
      if (ps.exitCode == 0 && ps.stderr === '') {
          return 1
      }
      return 0
  } catch (error) {
      console.log("errrrrrrrrror", error);
      return 0
  }
  }

  // call integration service

  // update Invoice status

  async storeToken(key: string, value: string) {
    await this.cacheManager.set(key, value);
  }

  async getToken(key: string): Promise<string | boolean> {
    return (await this.cacheManager.get(key)) ?? false;
  }
}
