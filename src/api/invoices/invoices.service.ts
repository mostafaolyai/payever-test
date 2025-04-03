import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from '../../database/models/invoice';
import { CreateInvoiceDto } from './dto/create-invoice-dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceModel.create(createInvoiceDto);
  }

  async findOne(id: string): Promise<Invoice> {
    const invoice = await this.invoiceModel.findById(id);

    if (!invoice) throw new NotFoundException('Invoice notFound!');

    return invoice;
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find();
  }
}
