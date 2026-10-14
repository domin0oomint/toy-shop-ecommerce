import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';//ตัวกลางที่ใช้จัดการข้อมูลในตาราง 
import { Product } from './product.Entity';
import { CreateProductDto } from './create-product.dto';
import { promises } from 'dns';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }
  async findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id: id }
    });
  }
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product | null> {
    const product = await this.findOne(id);
    if (!product) {
      return null;
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }
  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
 
}
