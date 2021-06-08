import { MaxLength, IsString, IsNumber, IsEnum, IsBase64, ValidateIf } from 'class-validator';
import { ProductType } from '../product-type.enum';

export class ProductDto {
  readonly id: number;

  @IsString()
  @MaxLength(30)
  name: string;

  @IsNumber()
  price: number;

  @IsEnum(ProductType)
  type: ProductType;

  @IsString()
  @MaxLength(4000)
  description: string;

  @ValidateIf(o => 'image' in o)
  @IsBase64()
  image: any;

  // user: Users;
}
