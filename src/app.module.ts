import { Module } from '@nestjs/common';
import { InvoicesModule } from './api/invoices/invoices.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CronModule } from './services/cron/cron.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodbb:27017', {
      maxPoolSize: 5,
      ignoreUndefined: true,
      user: 'root',
      pass: 'password',
      dbName: 'invoice',
    }),
    InvoicesModule,
    CronModule,
  ],
})
export class AppModule {}
