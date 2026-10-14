import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
export declare class CartService {
    private readonly cartRepository;
    private readonly cartItemRepository;
    constructor(cartRepository: Repository<Cart>, cartItemRepository: Repository<CartItem>);
    getCart(userId: number): Promise<CartItem[]>;
    addToCart(userId: number, productId: number, quantity: number): Promise<{
        message: string;
        cartId: number;
        productId: number;
        quantity: number;
    }>;
    updateCartItem(cartItemId: number, quantity: number): Promise<CartItem>;
    removeCartItem(cartItemId: number): Promise<{
        message: string;
    }>;
}
