import { Orders } from 'src/order/entities/orders.entity';
import { Products } from 'src/product/entities/products.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({type: 'varchar', length: 4000})
  observation: string;

  @Column({nullable: true})
  meet_options: string;

  @ManyToOne(() => Orders, order => order.orderToProduct)
  public orders: Orders;

  @ManyToOne(() => Products, product => product.productToOrder)
  public products: Products;
}
