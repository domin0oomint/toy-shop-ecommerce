import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './payment.entity';
import { User } from '../auth/user.entity';
import { Product } from '../products/product.Entity';
import { Order } from '../orders/order.entity';
@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }

  async createPayment(
    orderId: number,
    amount: number,
    method: string,
    slipImage: string | null,
  ) {
    const payment = this.paymentRepository.create({
      orderId: orderId,
      amount: amount,
      method: method,
      slipImage: slipImage,
      status: 'WAITING_FOR_REVIEW',
    });

    const savedPayment =
    await this.paymentRepository.save(payment);

  return savedPayment;
}
  async findAll() {
    return this.paymentRepository.find();
  }
  async getDashboard() {

    const users = await this.userRepository.find();
    const products = await this.productRepository.find();
    const orders = await this.orderRepository.find();
    const payments = await this.paymentRepository.find();

    const totalSales = payments.reduce(
      (sum, payment) => sum + Number(payment.amount),
      0,
    );

    return {
      totalUsers: users.length,
      totalProducts: products.length,
      totalOrders: orders.length,
      totalPayments: payments.length,
      totalSales: totalSales,
    };
  }
  async updateStatus(
  paymentId: number,
  status: string,
) {
  await this.paymentRepository.update(
    paymentId,
    {
      status: status,
    },
  );

  return this.paymentRepository.findOne({
    where: {
      id: paymentId,
    },
  });
}
}