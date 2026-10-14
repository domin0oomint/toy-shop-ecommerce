import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class SellerGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const session = request.session;

        if (session?.role === 'seller') {
            return true;
        }

        response.redirect('/');
        return false;
    }
    
}