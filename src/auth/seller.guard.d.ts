import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class SellerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
