import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartItem {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    cartId!: number;

    @Column()
    productId!: number;

    @Column()
    quantity!: number;
}