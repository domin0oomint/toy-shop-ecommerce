import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { User } from '../auth/user.entity';
import { Product } from '../products/product.Entity';
import { Order } from '../orders/order.entity';
export declare class PaymentsService {
    private readonly paymentRepository;
    private readonly userRepository;
    private readonly productRepository;
    private readonly orderRepository;
    constructor(paymentRepository: Repository<Payment>, userRepository: Repository<User>, productRepository: Repository<Product>, orderRepository: Repository<Order>);
    createPayment(orderId: number, amount: number, method: string): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    getDashboard(): Promise<{
        totalUsers: number;
        totalProducts: number;
        totalOrders: number;
        totalPayments: number;
        totalSales: number;
    }>;
}
