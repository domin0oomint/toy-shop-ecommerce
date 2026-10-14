import {
  Controller,
  Get,
  Post,
  Query,
  Session,
  Render,
  Body,
  Res,
  Param,
  
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import type { Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) { }

  @Get('checkout')
  @Render('orders/checkout')
  async checkout(
    @Query('cartItemIds') cartItemIds: string | string[],
    @Session() session: Record<string, any>,
  ) {
    if (!session.userId) {
      return {
        order: {
          items: [],
          total: 0,
        },
        username: null,
      };
    }

    // แปลงค่าที่ส่งมาจาก checkbox ให้เป็น array ของ number
    const selectedIds = Array.isArray(cartItemIds)
      ? cartItemIds.map(Number)
      : [Number(cartItemIds)];

    const order =
      await this.ordersService.checkout(
        session.userId,
        selectedIds,
      );

    return {
      order,
      username: session.username,
    };
  }

  @Post('confirm')
  async confirmOrder(
    @Body() body: any,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    if (!session.userId) {
      return res.redirect('/auth/login');
    }
     
    const cartItemIds = Array.isArray(body.cartItemIds)
      ? body.cartItemIds.map(Number)
      : [Number(body.cartItemIds)];

    const selectedIds = cartItemIds.map(Number);


    const result =
      await this.ordersService.confirmOrder(
        session.userId,
        selectedIds,
      );

    return res.redirect(`/payments/payment?orderId=${result.orderId}&amount=${result.total}`);
  }
  @Get('admin')
@Render('orders/admin')
async adminOrders(
    @Session() session: Record<string, any>,
) {
    const orders = await this.ordersService.findAllOrders();

    return {
        orders,
        username: session.username,
    };
}
  @Get('admin/:id')
  @Render('orders/detail')
  async adminOrderDetail(
    @Param('id') id: number
  ) {
    const result = await this.ordersService.findOrderDetails(id);
    return { 
      order : result.order,
      orderItems : result.orderItems
     };
  }
}
