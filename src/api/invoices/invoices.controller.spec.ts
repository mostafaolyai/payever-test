import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dtos/create-invoice-dto';
import { Invoice } from '../../database/models/invoice';

describe('InvoicesController', () => {
  let invoicesController: InvoicesController;
  let invoicesService: InvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [
        {
          provide: InvoicesService,
          useValue: {
            create: jest.fn(), // Mock the create method
            findOne: jest.fn(), // Mock the findOne method
            findAll: jest.fn(), // Mock the findAll method
          },
        },
      ],
    }).compile();

    invoicesController = module.get<InvoicesController>(InvoicesController);
    invoicesService = module.get<InvoicesService>(InvoicesService);
  });

  describe('create', () => {
    it('should create an invoice', async () => {
      const createInvoiceDto: CreateInvoiceDto = {
        customer: 'John Doe',
        amount: 100,
        reference: 'INV-001',
        date: new Date(),
        items: [{ sku: 'SKU001', qt: 2 }],
      };

      const result = {
        id: '12345',
        ...createInvoiceDto,
      };

      jest
        .spyOn(invoicesService, 'create')
        .mockResolvedValue(result as Invoice);

      expect(await invoicesController.create(createInvoiceDto)).toEqual(result);
      expect(invoicesService.create).toHaveBeenCalledWith(createInvoiceDto);
    });
  });

  describe('findOne', () => {
    it('should return a single invoice by ID', async () => {
      const result = {
        id: '12345',
        customer: 'John Doe',
        amount: 100,
        reference: 'INV-001',
        date: new Date(),
        items: [{ sku: 'SKU001', qt: 2 }],
      };

      jest
        .spyOn(invoicesService, 'findOne')
        .mockResolvedValue(result as Invoice);

      expect(await invoicesController.findOne('12345')).toEqual(result);
      expect(invoicesService.findOne).toHaveBeenCalledWith('12345');
    });
  });

  describe('findAll', () => {
    it('should return an array of invoices', async () => {
      const result = [
        {
          id: '12345',
          customer: 'John Doe',
          amount: 100,
          reference: 'INV-001',
          date: new Date(),
          items: [{ sku: 'SKU001', qt: 2 }],
        },
        {
          id: '67890',
          customer: 'Jane Smith',
          amount: 200,
          reference: 'INV-002',
          date: new Date(),
          items: [{ sku: 'SKU002', qt: 3 }],
        },
      ];

      jest
        .spyOn(invoicesService, 'findAll')
        .mockResolvedValue(result as Invoice[]);

      expect(await invoicesController.findAll()).toEqual(result);
      expect(invoicesService.findAll).toHaveBeenCalled();
    });
  });
});
