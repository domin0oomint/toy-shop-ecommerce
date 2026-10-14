import { Repository } from 'typeorm';
import { Product } from './product.Entity';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
export declare class ProductsService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    findOne(id: number): Promise<Product | null>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<Product | null>;
    remove(id: number): Promise<void>;
}
