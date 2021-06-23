import { MaxLength, IsString, IsNumber, ValidateIf } from 'class-validator';

export class OrderProductDto {
  readonly id: number;

  @ValidateIf(o => 'observation' in o)
  @MaxLength(4000)
  observation: string;

  @IsNumber()
  amount: number;

  @ValidateIf(o => 'meet_options' in o)
  @IsString()
  meet_options: string;

}
