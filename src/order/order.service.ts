import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
  ) {}

  public async create(orderDto: OrderDto): Promise<Orders> {
    try {
      return await this.orderRepository.save(orderDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll(query: any): Promise<any> {
    var where = {};
    if(query.status != undefined){
        where = {
          status: query.status
        }
    }
    if(query.client != undefined){
      if(query.status != undefined){
          where = {
            status: query.status,
            client_name: query.client
          }
      }
      else{
          where = {
            client_name: query.client
          }
      }
    }

    const orders = await this.orderRepository.find({where, relations: ["orderToProducts"]});
      // const orders = createQueryBuilder("orders")
      // .select('o.id')
      // .addSelect('p.name')
      // .innerJoin('order_product','orders.id = order_product.ordersId')
      // .innerJoin('products', 'products.id = order_product.productsId')
      // .getMany();
    return orders;
  }

  public async delete(id: string): Promise<any> {
    try {
      return await this.orderRepository.delete(+id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

}
