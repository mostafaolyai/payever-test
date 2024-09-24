import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesService } from './invoices.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from '../../database/models/invoice';
import { CreateInvoiceDto } from './dtos/create-invoice-dto';

describe('InvoicesService', () => {
  let service: InvoicesService;
  let model: Model<Invoice>;

  const mockInvoice = {
    customer: 'John Doe',
    amount: 100,
    reference: 'INV-001',
    date: new Date(),
    items: [{ sku: 'SKU001', qt: 2 }],
  };

  const mockInvoiceModel = {
    create: jest.fn().mockResolvedValue(mockInvoice),
    constructor: jest.fn().mockResolvedValue(mockInvoice),
    findById: jest.fn().mockResolvedValue(mockInvoice),
    find: jest.fn().mockResolvedValue([mockInvoice]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: getModelToken(Invoice.name),
          useValue: mockInvoiceModel, // Use mock for the model
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
    model = module.get<Model<Invoice>>(getModelToken(Invoice.name));
  });

  describe('create', () => {
    it('should successfully create an invoice', async () => {
      const createInvoiceDto: CreateInvoiceDto = {
        customer: 'John Doe',
        amount: 100,
        reference: 'INV-001',
        date: new Date(),
        items: [{ sku: 'SKU001', qt: 2 }],
      };

      const result = await service.create(createInvoiceDto);
      expect(result).toEqual(mockInvoice);
    });
  });

  describe('findOne', () => {
    it('should return an invoice by ID', async () => {
      const result = await service.findOne('12345');
      expect(result).toEqual(mockInvoice);
      expect(mockInvoiceModel.findById).toHaveBeenCalledWith('12345');
    });
  });

  describe('findAll', () => {
    it('should return an array of invoices', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockInvoice]);
      expect(mockInvoiceModel.find).toHaveBeenCalled();
    });
  });
});
