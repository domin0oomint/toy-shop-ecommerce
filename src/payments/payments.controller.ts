import {
  Controller,
  Post,
  Body,
  Res,
  Session,
  Get,
  Query,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {

  constructor(
    private readonly paymentsService: PaymentsService,
  ) { }

  @Get('admin')
  async showAdminPayments(
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    if (!session.userId) {
      return res.redirect('/auth/login');
    }

    if (session.role !== 'seller') {
      return res.status(403).send('Access Denied');
    }

    const payments = await this.paymentsService.findAll();

    return res.render('payments/admin', {
      payments,
      username: session.username,
    });
  }

  @Post('pay')
@UseInterceptors(
  FileInterceptor('slip', {
    storage: diskStorage({
      destination: './uploads/slips',
      filename: (req, file, callback) => {
        const uniqueName =
          `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;

        callback(null, uniqueName);
      },
    }),
  }),
)
async pay(
  @UploadedFile() file: Express.Multer.File,
  @Body() body: any,
  @Session() session: Record<string, any>,
  @Res() res: Response,
) {
  if (!session.userId) {
    return res.redirect('/auth/login');
  }

  const payment = await this.paymentsService.createPayment(
    Number(body.orderId),
    Number(body.amount),
    String(body.method),
    file ? file.filename : null,
  );

  return res.render('payments/success', {
    payment,
    username: session.username,
  });
}
  @Get('payment')
  @Get()

  async showPaymentPage(
    @Query('orderId') orderId: string,
    @Query('amount') amount: string,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    if (!session.userId) {
      return res.redirect('/auth/login');
    }
    else {
      return res.render('payments/payment', {
        username: session.username,
        orderId: Number(orderId),
        amount: Number(amount),
      });
    }

  }
  @Get('dashboard')
  async showDashboard(
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    if (!session.userId) {
      return res.redirect('/auth/login');
    }

    if (session.role !== 'seller') {
      return res.status(403).send('Access Denied');
    }

    const dashboard =
      await this.paymentsService.getDashboard();

    return res.render('payments/dashboard', {
      username: session.username,
      dashboard,
    });
  }
  // APPROVE PAYMENT
  // =========================
  @Post(':id/approve')
  async approvePayment(
    @Param('id') id: string,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    if (!session.userId) {
      return res.redirect('/auth/login');
    }

    if (session.role !== 'seller') {
      return res.status(403).send('Access Denied');
    }

    await this.paymentsService.updateStatus(
      Number(id),
      'PAID',
    );

    return res.redirect('/payments/admin');
  }

  // =========================
  // REJECT PAYMENT
  // =========================
  @Post(':id/reject')
  async rejectPayment(
    @Param('id') id: string,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    if (!session.userId) {
      return res.redirect('/auth/login');
    }

    if (session.role !== 'seller') {
      return res.status(403).send('Access Denied');
    }

    await this.paymentsService.updateStatus(
      Number(id),
      'REJECTED',
    );

    return res.redirect('/payments/admin');
  }
}

