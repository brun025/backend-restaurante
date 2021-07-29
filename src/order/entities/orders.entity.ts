import { OrderProduct } from '../../order_product/entities/order_product.entity';
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

  constructor(order?: Partial<Orders>){
    this.id = order?.id;
    this.client_name = order?.client_name;
    this.phone= order?.phone;
    this.cep = order?.cep;
    this.address_street = order?.address_street;
    this.address_number = order?.address_number;
    this.address_neighborhood = order?.address_neighborhood;
    this.address_city = order?.address_city;
    this.cost_freight = order?.cost_freight;
    this.payment = order?.payment;
    this.withdrawal = order?.withdrawal;
    this.status = order?.status;
    this.reference_point = order?.reference_point;
    this.change_of_money = order?.change_of_money;
    this.total = order?.total;
    this.createdAt = order?.createdAt;
    this.updatedAt = order?.updatedAt;
    this.orderToProducts = order?.orderToProducts;
  }
}
