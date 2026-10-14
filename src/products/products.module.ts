import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.Entity'; 
@Module({
  imports: [TypeOrmModule.forFeature([Product])], //ProductsModule นี้จะใช้ Repository ของ Product
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
