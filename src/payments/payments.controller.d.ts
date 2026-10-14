import type { Response } from 'express';
import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    showAdminPayments(session: Record<string, any>, res: Response): Promise<void | Response<any, Record<string, any>>>;
    pay(body: any, session: Record<string, any>, res: Response): Promise<void>;
    showPaymentPage(orderId: string, amount: string, session: Record<string, any>, res: Response): Promise<void>;
    showDashboard(session: Record<string, any>, res: Response): Promise<void | Response<any, Record<string, any>>>;
}
