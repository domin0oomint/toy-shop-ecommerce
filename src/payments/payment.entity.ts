import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderId!: number;

  @Column()
  amount!: number;

  @Column()
  method!: string;

  @Column()
  status!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  slipImage!: string | null;

  @CreateDateColumn()
  createdAt!: Date;
}