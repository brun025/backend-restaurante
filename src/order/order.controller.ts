import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { OrderProductService } from 'src/order_product/order_product.service';
import { OrderDto } from './dto/order.dto';
import { Orders } from './entities/orders.entity';
import { OrderStatus } from './order-status.enum';
import { OrderService } from './order.service';


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

    return res.status(HttpStatus.OK).json(orders);
  }

  @Get('/paged')
  public async getPaged(@Res() res: Response, @Req() request: Request) {
    let { limit, page }: any = request.query;
    limit = parseInt(limit || 0);
    page = parseInt(page || 0);
    const orderPaged = await this.orderService.findPaged(limit, page); 
    
    return res.status(HttpStatus.OK).json({
      total: orderPaged.total,
      page: orderPaged.page,
      totalPages: orderPaged.totalPages,
      limit: orderPaged.limit,
      offset: orderPaged.offset,
      instances: orderPaged.instaces
    });
  }

  @Get('/:orderId')
  public async getById(@Res() res, @Param('orderId') orderId: string): Promise<Orders> {
    const order = await this.orderService.findById(orderId);

    return res.status(HttpStatus.OK).json(order);
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
      //   element.orderId = order.id;
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
