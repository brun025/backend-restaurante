import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProduct } from './entities/order_product.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {}

  public async createOrderProduct(orderId: number, body: any): Promise<any> {
    try {
      const list = [];

      body.forEach(element => {
        list.push({
          amount: element.amount,
          observation: element.observation != undefined ? element.observation : null,
            // eslint-disable-next-line @typescript-eslint/camelcase
          meet_options: element.meet_options != undefined ? element.meet_options : null,
          orderId: orderId, 
          productId: element.product
        });
      });
      // console.log(list);
      return await this.orderProductRepository.save(list);

    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteProductFromOrder(orderId: number): Promise<any> {
    try {
      return await this.orderProductRepository.delete({
        orderId: orderId
      });

    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

}
