import { Controller, Get, Post, Put, Body, Res, Req, HttpStatus, UseGuards, Delete, Param } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { Orders } from './entities/orders.entity';
import { OrderService } from './order.service';
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { OrderProductService } from 'src/order_product/order_product.service';
import { OrderStatus } from './order-status.enum';

// @UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('api/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderProductService: OrderProductService
    ) {}

  @Get()
  public async getAll(@Res() res, @Req() request): Promise<Orders[]> {
    const orders = await this.orderService.findAll(request.query);

    return res.status(HttpStatus.OK).json({
      orders: orders,
      status: 200,
    });
  }

  @Get('/:orderId')
  public async getById(@Res() res, @Param('orderId') orderId: string): Promise<Orders> {
    const order = await this.orderService.findById(orderId);

    return res.status(HttpStatus.OK).json({
      order: order,
      status: 200,
    });
  }

  @Post()
  public async create(
    @Res() res,
    @Body() orderDto: OrderDto,
  ): Promise<any> {
    try {
      orderDto.status = OrderStatus.INICIALIZADO;
      const order = await this.orderService.create(orderDto);
      // const orderProduct = orderDto.products;
      
      // orderProduct.forEach(element => {
      //   element.ordersId = order.id;
      //   console.log(element)
      //   this.orderProductService.createOrderProduct(element);
      // });
      this.orderProductService.createOrderProduct(order.id, orderDto.products);


      return res.status(HttpStatus.OK).json({
        message: 'Pedido cadastrado com sucesso.',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erro ao cadastrar pedido!' + err,
        status: 400,
      });
    }
  }

  @Put('/:orderId/changeStatus')
  public async update(
    @Res() res,
    @Body() orderStatus: any,
    @Param('orderId') orderId: string
  ): Promise<any> {
    try {
      const order = await this.orderService.findById(orderId);
      if(order){
        order.status = orderStatus.status;
        await this.orderService.updateStatus(order, orderId);
  
        return res.status(HttpStatus.OK).json({
          message: 'Status atualizado com sucesso.',
          status: 200,
        });
      }
      else{
        return res.status(HttpStatus.OK).json({
          message: 'Pedido não encontrado.',
          status: 200,
        });
      }
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erro ao atualizar status!',
        status: 400,
      });
    }
  }

}
