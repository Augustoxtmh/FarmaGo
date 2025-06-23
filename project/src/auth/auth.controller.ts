import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: { email: string; contra: string }) {
        return this.authService.validateUser(loginDto.email, loginDto.contra);
    }
}
