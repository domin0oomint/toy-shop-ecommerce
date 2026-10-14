import {
    Body,
    Delete,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Render,
    Res,
    Session,
    UseGuards,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import type { Response } from 'express';
import { SellerGuard } from '../auth/seller.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
@Controller('products')
export class ProductsController {

    constructor(
        private readonly productsService: ProductsService
    ) { }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get('page')
    @Render('products/index')
    async showProducts(
        @Session() session: Record<string, any>
    ) {
        const products = await this.productsService.findAll();

        return {
            products,
            role: session.role,
            username: session.username,
            userId: session.userId
        };
    }
    @Get('me')
    me(@Session() session: Record<string, any>) {
        console.log('SESSION:', session);

        return {
            userId: session.userId,
            username: session.username,
            role: session.role,
        };
    }


    @Get('create')
    @UseGuards(SellerGuard)
    @Render('products/create')
    showCreateForm() {
        return {};
    }

    @Post()
@UseGuards(SellerGuard)
@UseInterceptors(
    FileInterceptor('image', {
        dest: './public/images',
    }),
)
async create(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
    @UploadedFile() image: any,
) {
    if (image) {
        createProductDto.image = `/images/${image.filename}`;
    }

    await this.productsService.create(createProductDto);

    return res.redirect('/products/page');
}
    @Get(':id')
    @Render('products/detail')
    async showProductDetail(
        @Param('id') id: string,
        @Session() session: Record<string, any>
    ) {
        const product = await this.productsService.findOne(Number(id));
        {
            return { product, role: session.role };
        }
    }

    @Patch(':id')
    @UseGuards(SellerGuard)
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productsService.update(
            Number(id),
            updateProductDto,
        );
    }

    @Delete(':id')
    @UseGuards(SellerGuard)
    remove(@Param('id') id: string) {
        return this.productsService.remove(Number(id));
    }
    @Post(':id/delete')
    @UseGuards(SellerGuard)
    async deleteProduct(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        await this.productsService.remove(Number(id));

        return res.redirect('/products/page');
    }
    @Get(':id/edit')
    @UseGuards(SellerGuard)
    @Render('products/edit')
    async showEditForm(
        @Param('id') id: string,
    ) {
        const product = await this.productsService.findOne(Number(id));
        return { product };
    }
    @Post(':id/edit')
    @UseGuards(SellerGuard)
    async editProduct(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
        @Res() res: Response,
    ) {
        await this.productsService.update(
            Number(id),
            updateProductDto,
        );

        return res.redirect('/products/page');
    }


    }

