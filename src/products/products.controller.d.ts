import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import type { Response } from 'express';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<import("./product.Entity").Product[]>;
    showProducts(session: Record<string, any>): Promise<{
        products: import("./product.Entity").Product[];
        role: any;
        username: any;
        userId: any;
    }>;
    me(session: Record<string, any>): {
        userId: any;
        username: any;
        role: any;
    };
    showCreateForm(): {};
    create(createProductDto: CreateProductDto, res: Response, image: any): Promise<void>;
    showProductDetail(id: string, session: Record<string, any>): Promise<{
        product: import("./product.Entity").Product | null;
        role: any;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./product.Entity").Product | null>;
    remove(id: string): Promise<void>;
    deleteProduct(id: string, res: Response): Promise<void>;
    showEditForm(id: string): Promise<{
        product: import("./product.Entity").Product | null;
    }>;
    editProduct(id: string, updateProductDto: UpdateProductDto, res: Response): Promise<void>;
}
