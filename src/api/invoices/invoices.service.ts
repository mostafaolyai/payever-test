import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from '../../database/models/invoice';
import { CreateInvoiceDto } from './dtos/create-invoice-dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceModel.create(createInvoiceDto);
  }

  async findOne(id: string): Promise<Invoice> {
    return this.invoiceModel.findById(id);
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find();
  }
}
