import { OrderProduct } from '../../../src/order_product/entities/order_product.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderStatus } from '../order-status.enum';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_name: string;

  @Column({nullable: true})
  phone: string;

  @Column({nullable: true})
  cep: string;

  @Column({nullable: true})
  address_street: string;

  @Column({nullable: true, type: 'int'})
  address_number: number;

  @Column({nullable: true})
  address_neighborhood: string;

  @Column({nullable: true})
  address_city: string;

  @Column({nullable: true, type: 'float'})
  cost_freight: number;

  @Column()
  payment: string;

  @Column()
  withdrawal: string;

  @Column({default: OrderStatus.INICIALIZADO})
  status: OrderStatus;

  @Column({nullable: true})
  reference_point: string;

  @Column({nullable: true, type: 'float'})
  change_of_money: number;

  @Column('float')
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderProduct, orderToProduct => orderToProduct.orders, {eager: true})
  orderToProducts: OrderProduct[];
}
