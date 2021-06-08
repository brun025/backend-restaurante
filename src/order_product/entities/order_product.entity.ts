import { Orders } from 'src/order/entities/orders.entity';
import { Products } from 'src/product/entities/products.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

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

  @ManyToOne(() => Orders, order => order.orderToProducts, { lazy: true })
  @JoinColumn({ referencedColumnName: "id" })
  public orders: Orders;

  @ManyToOne(() => Products, product => product.orderToProducts, { lazy: true })
  @JoinColumn({ referencedColumnName: "id" })
  public products: Products;
}
