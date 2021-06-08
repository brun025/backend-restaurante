import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { OrderPayment } from '../order-payment.enum';
import { OrderStatus } from '../order-status.enum';
import { OrderWithdrawal } from '../order-withdrawal.enum';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_name: string;

  @Column()
  phone: string;

  @Column()
  cep: string;

  @Column()
  address_street: string;

  @Column()
  address_number: number;

  @Column()
  address_neighborhood: string;

  @Column()
  address_city: string;

  @Column()
  cost_freight: number;

  @Column()
  payment: string;

  @Column()
  withdrawal: string;

  @Column()
  status: string;

  @Column({nullable: true})
  reference_point: string;

  @Column({nullable: true})
  change_of_money: number;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderProduct, orderToProduct => orderToProduct.products)
  public orderToProducts: OrderProduct[];
}
