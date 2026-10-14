import { OrdersService } from './orders.service';
import type { Response } from 'express';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    checkout(cartItemIds: string | string[], session: Record<string, any>): Promise<{
        order: {
            items: {
                cartItemId: number;
                productId: number;
                productName: string;
                quantity: number;
                price: number;
                subtotal: number;
            }[];
            total: number;
        };
        username: any;
    }>;
    confirmOrder(body: any, session: Record<string, any>, res: Response): Promise<void>;
    adminOrders(session: Record<string, any>): Promise<{
        orders: import("./order.entity").Order[];
        username: any;
    }>;
    adminOrderDetail(id: number): Promise<{
        order: import("./order.entity").Order | null;
        orderItems: {
            productId: number;
            productName: string | undefined;
            quantity: number;
            price: number;
        }[];
    }>;
}
