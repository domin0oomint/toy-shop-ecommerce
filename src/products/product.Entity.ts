import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity() // ผูกกับ database table ยพนกีแะ
export class Product {
  @PrimaryGeneratedColumn() //สร้าง Primary Key และให้ Database เพิ่มเลขให้อัตโนมัติ สร้าง id อัตโนมัติ
  id!: number;

  @Column()
  name!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column()
  stock!: number;

  @Column()
  description!: string;

  @Column()
  image!: string;
}   
//ตอนนี้เราสร้าง Entity แล้ว แต่ TypeORM ยังต้อง รู้จัก Entity นี้เราจะกลับไปแก้ products.module.ts