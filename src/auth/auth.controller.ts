import {
    Body,
    Controller,
    Get,
    Post,
    Render,
    Session,
    Redirect,
    Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { register } from 'module';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }
    @Get('register')
    @Render('auth/register')
    showRegister() {
        return {};
    }

    @Post('register')
    async register(
        @Body('username') username: string,
        @Body('password') password: string,
        @Body('email') email: string,
        @Res() res: Response,
    ) {
        const user = await this.authService.register(
            username,
            email,
            password,
        );

        if (!user) {
            return res.send('Username already exists');
        }

        return res.redirect('/auth/login');
    }

    @Get('login')
    @Render('auth/login')
    showLogin() {
        return {};
    }

    @Post('login')
    @Redirect('/products/page')
    async login(
        @Body('username') username: string,
        @Body('password') password: string,
        @Session() session: Record<string, any>,
    ) {

        const user = await this.authService.login(
            username,
            password,
        );

        if (!user) {
            return {
                url: '/auth/login',
                statusCode: 302,
            };
        }

        // เก็บข้อมูลคนที่ Login ไว้ใน Session
        session.userId = user.id;
        session.username = user.username;
        session.role = user.role;

        console.log('Login:', user.username);
        console.log('Role:', user.role);
    }
    @Get('logout')
    logout(
        @Session() session: Record<string, any>,
        @Res() res: Response,
    ) {
        session.destroy(() => {
            res.redirect('/auth/login');
        });
    }
}