import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { LessThan, Repository } from 'typeorm';
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
    const objectWhere = {
      status: null,
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_name: null,
      createdAt: null
    };
    if(query.status != undefined){
      objectWhere.status = query.status
    }
    if(query.client != undefined){
      // eslint-disable-next-line @typescript-eslint/camelcase
      objectWhere.client_name = query.client

    }
    if(query.data != undefined){
      objectWhere.createdAt = LessThan(query.data + ' 23:59:59')
    }

    let where = {};
    where = Object.keys(objectWhere).filter((k) => objectWhere[k] != null)
              .reduce((a, k) => ({ ...a, [k]: objectWhere[k] }), {});
    // console.log(where)

    const orders = await this.orderRepository.find({where, relations: ["orderToProducts"]});
    return orders;
  }

  public async updateStatus(order: Orders, id: string): Promise<Orders> {
    try {
      return await this.orderRepository.save({ ...order, id: Number(id) });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findById(id: string): Promise<Orders> {
    const order = await this.orderRepository.findOne({
      where: {
        id: id
      },
      relations: ["orderToProducts"]
    });
    return order;
  }

}