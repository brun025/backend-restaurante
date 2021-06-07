import { MaxLength, IsString, IsNumber, ValidateIf } from 'class-validator';

export class OrderProductDto {
  readonly id: number;

  @IsString()
  @MaxLength(4000)
  observation: string;

  @IsNumber()
  amount: number;

  @ValidateIf(o => 'reference_point' in o)
  @IsString()
  meet_options: string;

  // user: Users;
}
