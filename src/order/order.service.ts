import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { Repository } from 'typeorm';
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

  public async findAll(): Promise<Orders[]> {
    const orders = await this.orderRepository.find({relations: ["orderToProduct"]});
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
