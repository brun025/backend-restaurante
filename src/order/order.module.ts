import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { Orders } from "./entities/orders.entity";
import { OrderProductService } from "src/order_product/order_product.service";
import { OrderProduct } from "src/order_product/entities/order_product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderProduct])],
  controllers: [OrderController],
  providers: [OrderService, OrderProductService],
})
export class OrderModule {}
