import { MaxLength, IsString, IsNumber, IsEnum, ValidateIf, IsNotEmpty } from 'class-validator';
import { OrderPayment } from '../order-payment.enum';
import { OrderStatus } from '../order-status.enum';
import { OrderWithdrawal } from '../order-withdrawal.enum';

export class OrderDto {
  readonly id: number;

  @IsString()
  @MaxLength(200)
  client_name: string;

  @IsString()
  @MaxLength(15)
  phone: string;

  @IsString()
  @MaxLength(15)
  cep: string;

  @IsString()
  @MaxLength(200)
  address_street: string;

  @IsNumber()
  address_number: number;

  @IsString()
  @MaxLength(100)
  address_neighborhood: string;

  @IsString()
  @MaxLength(100)
  address_city: string;

  @IsNumber()
  cost_freight: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsEnum(OrderPayment)
  payment: OrderPayment;

  @IsEnum(OrderWithdrawal)
  withdrawal: OrderWithdrawal;

  @ValidateIf(o => 'reference_point' in o)
  @IsString()
  reference_point: string;

  @ValidateIf(o => 'change_of_money' in o)
  @IsNumber()
  change_of_money: number;

  @IsNumber()
  total: number;

  @IsNotEmpty()
  products: any

}
