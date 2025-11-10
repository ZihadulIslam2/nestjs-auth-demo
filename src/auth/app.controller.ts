import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() loginData: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginData.username,
      loginData.password,
    );

    if (!user) {
      return { message: 'ইউজারনেম বা পাসওয়ার্ড ভুল' };
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      message: 'এই是你的 প্রোফাইল',
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get('user-dashboard')
  userDashboard(@Request() req) {
    return {
      message: 'ইউজার ড্যাশবোর্ডে স্বাগতম!',
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin-dashboard')
  adminDashboard(@Request() req) {
    return {
      message: 'অ্যাডমিন ড্যাশবোর্ডে স্বাগতম!',
      user: req.user,
      stats: {
        totalUsers: 150,
        activeUsers: 120,
      },
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superadmin')
  @Get('super-admin')
  superAdmin(@Request() req) {
    return {
      message: 'সুপার অ্যাডমিন প্যানেল!',
      user: req.user,
      systemInfo: {
        version: '1.0.0',
        status: 'Active',
      },
    };
  }
}
