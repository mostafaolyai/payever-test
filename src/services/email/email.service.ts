import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class EmailSenderService implements OnModuleInit {
  async onModuleInit() {
    // Automatically start consuming messages when the module is initialized
    await this.consumeSalesReport();
  }

  async consumeSalesReport() {
    const connection = await amqp.connect(
      'amqp://user:password@rabbitmqq:5672',
    );
    const channel = await connection.createChannel();
    const queue = 'daily_sales_report';

    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, (message) => {
      if (message) {
        const report = JSON.parse(message.content.toString());
        console.log(report, message.content.toString());
        this.sendEmailReport(report);
        channel.ack(message);
      }
    });
  }

  sendEmailReport(report) {
    console.log(`Report: ${JSON.stringify(report)}`);
  }
}
