import { AuthService } from './auth.service';
import type { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    showRegister(): {};
    register(username: string, password: string, email: string, res: Response): Promise<void | Response<any, Record<string, any>>>;
    showLogin(): {};
    login(username: string, password: string, session: Record<string, any>): Promise<{
        url: string;
        statusCode: number;
    } | undefined>;
    logout(session: Record<string, any>, res: Response): void;
}
