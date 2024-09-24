import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Invoice } from '../../database/models/invoice';
import { InvoicesService } from '../../api/invoices/invoices.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class CronService {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly rabbitMQ: RabbitMQService,
  ) {}

  @Cron('* 12 * * *')
  async handleDailySalesReport() {
    console.log('Start Cron Job');
    const invoices = await this.invoicesService.findAll();
    const totalSales = invoices.reduce(
      (sum, invoice) => sum + invoice.amount,
      0,
    );
    const itemSalesSummary = this.calculateItemSales(invoices);

    // Send the data to RabbitMQ
    this.publishSalesReport(totalSales, itemSalesSummary);
  }

  calculateItemSales(invoices: Invoice[]) {
    const itemSummary = {};
    invoices.forEach((invoice) => {
      invoice.items.forEach((item) => {
        if (!itemSummary[item.sku]) {
          itemSummary[item.sku] = 0;
        }
        itemSummary[item.sku] += item.qt;
      });
    });
    return itemSummary;
  }

  publishSalesReport(totalSales: number, itemSalesSummary: any) {
    console.log('Send to RabbitMQ');
    this.rabbitMQ.publish(totalSales, itemSalesSummary);
  }
}
