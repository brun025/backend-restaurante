import { MaxLength, IsNotEmpty, IsEmail, IsString, IsNumber } from 'class-validator';

export class ShippingDto {
  @IsNotEmpty({
    message: 'Informe um cep',
  })
  cep: string;

  @IsNotEmpty({
    message: 'Informe um valor',
  })
  @IsNumber()
  value: number;
}
