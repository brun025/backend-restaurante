import { Orders } from '../../order/entities/orders.entity';
import { Products } from '../../product/entities/products.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  readonly orderId: number;

  @Column()
  readonly productId: number

  @Column()
  amount: number;

  @Column({ type: 'varchar', length: 4000, nullable: true })
  observation: string;

  @Column({ nullable: true })
  meet_options: string;

  @Column('float')
  total_item: number;

  @ManyToOne(() => Orders, (orders) => orders.orderToProducts)
  @JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
  orders: Orders;

  @ManyToOne(() => Products, (products) => products.orderToProducts, { eager: true })
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  products: Products;
}
