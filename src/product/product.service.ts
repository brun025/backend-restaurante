import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>
  ) {}

  public async create(productDto: ProductDto): Promise<Products> {
    try {
      return await this.productRepository.save(productDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async update(productDto: ProductDto, id: string): Promise<Products> {
    try {
      return await this.productRepository.save({ ...productDto, id: Number(id) });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll(query: any): Promise<Products[]> {
    var search = {};
    if(query.type != undefined){
      search = {
        where: {
          type: query.type
        }
      }
    }

    const products = await this.productRepository.find(search);
    return products;
  }

  public async findById(id: string): Promise<Products> {
    const product = await this.productRepository.findOne({
      where: {
        id: id
      }
    });
    return product;
  }

  public async delete(id: string): Promise<any> {
    try {
      return await this.productRepository.delete(+id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

}
