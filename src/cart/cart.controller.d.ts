import { CartService } from './cart.service';
import type { Response } from 'express';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    showCart(session: Record<string, any>): Promise<{
        items: import("./cart-item.entity").CartItem[];
        userId: any;
        username: any;
        role: any;
    }>;
    addToCart(body: any, session: Record<string, any>, res: Response): Promise<void>;
    editCartItem(id: string, body: any, res: Response): Promise<void>;
    deleteCartItem(id: string, res: Response): Promise<void>;
}
