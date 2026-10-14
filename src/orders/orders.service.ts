import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { Cart } from '../cart/cart.entity';
import { CartItem } from '../cart/cart-item.entity';
import { Product } from '../products/product.Entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async checkout(
    userId: number,
    selectedIds: number[],
  ) {

    // 1. หา cart ของ user
    const cart = await this.cartRepository.findOne({
      where: {
        userId: userId,
      },
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    // 2. ดึงสินค้าใน cart
    const cartItems = await this.cartItemRepository.find({
      where: {
        cartId: cart.id,
      },
    });
    const selectedCartItems = cartItems.filter(
      item => selectedIds.includes(item.id),
    );

    if (selectedCartItems.length === 0) {
      throw new Error('No products selected');
    }

    // 3. เตรียมข้อมูล order items
    const items: {
      cartItemId: number;
      productId: number;
      productName: string;
      quantity: number;
      price: number;
      subtotal: number;
    }[] = [];

    let total = 0;
    for (const cartItem of selectedCartItems) {

      const product = await this.productRepository.findOne({
        where: {
          id: cartItem.productId,
        },
      });

      if (!product) {
        throw new Error(
          `Product ${cartItem.productId} not found`,
        );
      }

      const price = Number(product.price);

      const subtotal =
        price * cartItem.quantity;

      total += subtotal;

      items.push({
        cartItemId: cartItem.id,
        productId: product.id,
        productName: product.name,
        quantity: cartItem.quantity,
        price: price,
        subtotal: subtotal,
      });
    }
    // 7. ส่งข้อมูลกลับไปให้ Controller
    return {
      items: items,
      total: total,
    };
  }
  async confirmOrder(
    userId: number,
    selectedIds: number[],
  ) {
    const cart = await this.cartRepository.findOne({
      where: { userId: userId },
    });

    if (!cart) throw new Error('Cart not found');

    const cartItems = await this.cartItemRepository.find({
      where: { cartId: cart.id },
    });

    const selectedCartItems = cartItems.filter(
      item => selectedIds.includes(item.id),
    );

    if (selectedCartItems.length === 0) {
      throw new Error('No products selected');
    }

    let total = 0;

    const order = this.orderRepository.create({
      userId: userId,
      total: 0,
    });

    const savedOrder = await this.orderRepository.save(order);

    for (const cartItem of selectedCartItems) {
      const product = await this.productRepository.findOne({
        where: { id: cartItem.productId },
      });

      if (!product) {
        throw new Error(
          `Product ${cartItem.productId} not found`,
        );
      }

      const price = Number(product.price);
      const subtotal = price * cartItem.quantity;
      total += subtotal;

      const orderItem = this.orderItemRepository.create({
        orderId: savedOrder.id,
        productId: product.id,
        quantity: cartItem.quantity,
        price: price,
      });

      await this.orderItemRepository.save(orderItem);

      await this.cartItemRepository.remove(cartItem);
    }

    savedOrder.total = total;
    await this.orderRepository.save(savedOrder);

    return {
      orderId: savedOrder.id,
      total: total,
    };
  }
  async findAllOrders() {
    return this.orderRepository.find();
  }
  async findOrderDetails(orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    const orderItems = await this.orderItemRepository.find({
      where: { orderId: orderId },
    });
    const items: {
      productId: number;
      productName: string | undefined;
      quantity: number;
      price: number;
    }[] = [];

    for (const item of orderItems) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });

      items.push({
        productId: item.productId,
        productName: product?.name,
        quantity: item.quantity,
        price: item.price,
      });
    }
    return {
      order,
      orderItems: items,
    };
  }

}