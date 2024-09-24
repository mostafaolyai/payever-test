import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  async publish(totalSales: number, itemSalesSummary: any) {
    const connection = await amqp.connect(
      'amqp://user:password@rabbitmqq:5672',
    );
    const channel = await connection.createChannel();
    const queue = 'daily_sales_report';

    await channel.assertQueue(queue, { durable: true });
    const report = {
      totalSales,
      itemSalesSummary,
    };
    console.log(report);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(report)));
  }
}
