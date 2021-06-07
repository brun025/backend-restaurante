import { Controller, Get, Post, Body, Res, HttpStatus, UseGuards, Delete, Param } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { Orders } from './entities/orders.entity';
import { OrderService } from './order.service';
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { OrderProductService } from 'src/order_product/order_product.service';

// @UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('api/orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderProductService: OrderProductService
    ) {}

  @Get()
  public async getAll(@Res() res): Promise<Orders[]> {
    const orders = await this.orderService.findAll();

    return res.status(HttpStatus.OK).json({
      orders: orders,
      status: 200,
    });
  }

  @Post()
  public async create(
    @Res() res,
    @Body() orderDto: OrderDto,
  ): Promise<any> {
    try {
      var order = await this.orderService.create(orderDto);
      var orderProduct = orderDto.products;
      
      orderProduct.forEach(element => {
        element.orders = order.id;
        // console.log(element)
        this.orderProductService.createOrderProduct(element);
      });

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

  @Delete("/:orderId")
  public async delete(
    @Res() res,
    @Param('orderId') orderId: string
  ): Promise<any> {
    try {
      await this.orderService.delete(orderId);

      return res.status(HttpStatus.OK).json({
        message: "Pedido deletado com sucesso.",
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao deletar pedido!",
        status: 400,
      });
    }
  }
}
