import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceLine } from '../../entities/invoice-line.entity';
import { Repository } from 'typeorm';
import { CreateLineDto, UpdateLineDto } from '../../dtos/invoice-line.dto';

@Injectable()
export class InvoiceLineService {
    constructor(@InjectRepository(InvoiceLine) private readonly repo: Repository<InvoiceLine>) { }

    async create(invoiceDto: CreateLineDto) {
        console.log(invoiceDto)
        const newLine: InvoiceLine = {
            quantity: invoiceDto.quantity,
            salesTotal: invoiceDto.salesTotal,
            total: invoiceDto.total,
            valueDifference: invoiceDto.valueDifference,
            totalTaxableFees: invoiceDto.totalTaxableFees,
            netTotal: invoiceDto.netTotal,
            itemsDiscount: invoiceDto.itemsDiscount,
            currencyExchangeRate: invoiceDto.currencyExchangeRate,
            discount_rate: invoiceDto.discount_rate,
            discount_amount: invoiceDto.discount_amount,
            internalCode: invoiceDto.internalCode,
            item: { id: +invoiceDto.item }
        }

        return await this.repo.save(newLine)
    }

    async findAll() {
        return await this.repo.find()
    }

    async findOne(id: number) {
        return await this.repo.findOneBy({ id: id })
    }

    async update(id: number, updateLine: UpdateLineDto) {
        return await this.repo.update(id, updateLine)
    }

    async delete(id: number) {
        return await this.repo.delete({ id: id })
    }
}
