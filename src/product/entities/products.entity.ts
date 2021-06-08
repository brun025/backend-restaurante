import { OrderProduct } from 'src/order_product/entities/order_product.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductType } from '../product-type.enum';
@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  type: ProductType;

  @Column({ type:'varchar', length: 4000})
  description: string;

  @Column({default: true})
  status: boolean;

  @Column({nullable:true})
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderProduct, productToOrder => productToOrder.orders)
  public orderToProducts: OrderProduct[];
}
