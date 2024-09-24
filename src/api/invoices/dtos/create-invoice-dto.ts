// create-invoice.dto.ts

import {
  IsString,
  IsNumber,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateItemDto {
  @IsString()
  sku: string;

  @IsNumber()
  qt: number;
}

export class CreateInvoiceDto {
  @IsString()
  customer: string;

  @IsNumber()
  amount: number;

  @IsString()
  reference: string;

  @IsDate()
  @Type(() => Date) // This helps to automatically transform the incoming string to a Date object
  date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto) // This is needed to correctly transform the nested items array
  items: CreateItemDto[];
}
