import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../../entities/invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../../dtos/invoice.dto';

@Injectable()
export class InvoiceService {
    constructor(@InjectRepository(Invoice) private readonly repo: Repository<Invoice>) { }

    async create(invoiceDto: CreateInvoiceDto) {
        const newInvoice: Invoice = {
            documentType: invoiceDto.documentType,
            version: invoiceDto.version,
            docTtotalDiscountAmount: invoiceDto.docTtotalDiscountAmount,
            totalSalesAmount: invoiceDto.totalSalesAmount,
            internalID: invoiceDto.internalID,
            // invoiceLine: invoiceDto.invoiceLine.map(line=>{
            //     return {
            //         item:line.id,

            //     }
            // }),
            user: { id: +invoiceDto.user }
        }

        return await this.repo.save(newInvoice)
    }

    async findAll() {
        return this.repo.find()
    }

    async findOne(id: number) {
        return this.repo.findOneBy({ id: id })
    }

    async update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
        return this.repo.update(id, updateInvoiceDto)
    }

    async remove(id: number) {
        return this.repo.delete(id)
    }
}
