import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @OneToMany(() => OrderProduct, orderToProduct => orderToProduct.orders, {eager: true})
  orderToProducts: OrderProduct[];
}
