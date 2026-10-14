import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';

@Injectable()
export class CartService {

    constructor(

        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,

        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,

    ) { }


    async getCart(userId: number) {
        const cart = await this.cartRepository.findOne({
            where: {
                userId: userId,
            },
        });

        if (!cart) {
            return [];
        }

        const items = await this.cartItemRepository.find({
            where: {
                cartId: cart.id,
            },
        });

        return items;
    }

    async addToCart(
        userId: number,
        productId: number,
        quantity: number,
    ) {

        // หา Cart ของ User
        let cart = await this.cartRepository.findOne({
            where: {
                userId: userId,
            },
        });


        // ถ้ายังไม่มี Cart ให้สร้างใหม่
        if (!cart) {

            cart = this.cartRepository.create({
                userId: userId,
            });

            cart = await this.cartRepository.save(cart);
        }


        // สร้างรายการสินค้า
        const cartItem = this.cartItemRepository.create({
            cartId: cart.id,
            productId: productId,
            quantity: quantity,
        });


        await this.cartItemRepository.save(cartItem);


        return {
            message: 'Product added to cart',
            cartId: cart.id,
            productId: productId,
            quantity: quantity,
        };
    }
    async updateCartItem(
    cartItemId: number,
    quantity: number,
) {
    const item = await this.cartItemRepository.findOne({
        where: {
            id: cartItemId,
        },
    });

    if (!item) {
        throw new Error('Cart item not found');
    }

    item.quantity = quantity;

    return this.cartItemRepository.save(item);
}
async removeCartItem(cartItemId: number) {
    const item = await this.cartItemRepository.findOne({
        where: {
            id: cartItemId,
        },
    });

    if (!item) {
        throw new Error('Cart item not found');
    }

    await this.cartItemRepository.remove(item);

    return {
        message: 'Cart item removed',
    };
}
}