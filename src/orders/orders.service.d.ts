import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { Cart } from '../cart/cart.entity';
import { CartItem } from '../cart/cart-item.entity';
import { Product } from '../products/product.Entity';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly cartRepository;
    private readonly cartItemRepository;
    private readonly productRepository;
    constructor(orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>, cartRepository: Repository<Cart>, cartItemRepository: Repository<CartItem>, productRepository: Repository<Product>);
    checkout(userId: number, selectedIds: number[]): Promise<{
        items: {
            cartItemId: number;
            productId: number;
            productName: string;
            quantity: number;
            price: number;
            subtotal: number;
        }[];
        total: number;
    }>;
    confirmOrder(userId: number, selectedIds: number[]): Promise<{
        orderId: number;
        total: number;
    }>;
    findAllOrders(): Promise<Order[]>;
    findOrderDetails(orderId: number): Promise<{
        order: Order | null;
        orderItems: {
            productId: number;
            productName: string | undefined;
            quantity: number;
            price: number;
        }[];
    }>;
}
