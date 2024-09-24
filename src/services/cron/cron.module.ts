import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { InvoicesModule } from '../../api/invoices/invoices.module';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { EmailSenderService } from '../email/email.service';

@Module({
  imports: [ScheduleModule.forRoot(), InvoicesModule],
  providers: [CronService, RabbitMQService, EmailSenderService],
})
export class CronModule {}
