import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Session,
    Render,
    Res,
} from '@nestjs/common';

import { CartService } from './cart.service';

import type { Response } from 'express';

@Controller('cart')
export class CartController {

    constructor(
        private readonly cartService: CartService,
    ) { }

    @Get()
    @Render('cart/index')
    async showCart(
        @Session() session: Record<string, any>,
    ) {

        // ถ้ายังไม่ได้ Login
        if (!session.userId) {
            return {
                items: [],
                userId: null,
                username: null,
                role: null,
            };
        }

        const items = await this.cartService.getCart(
            session.userId,
        );

        return {
            items,
            userId: session.userId,
            username: session.username,
            role: session.role,
        };
    }


    @Post('add')
    async addToCart(
        @Body() body: any,
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ) {

        await this.cartService.addToCart(
            session.userId,
            Number(body.productId),
            Number(body.quantity),
        );

        return res.redirect('/cart');
    }
    @Post(':id/edit')
    async editCartItem(
        @Param('id') id: string,
        @Body() body: any,
        @Res() res: Response,
    ) {
        await this.cartService.updateCartItem(
            Number(id),
            Number(body.quantity),
        );

        return res.redirect('/cart');
    }
    @Post(':id/delete')
    async deleteCartItem(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        await this.cartService.removeCartItem(
            Number(id),
        );

        return res.redirect('/cart');
    }

}