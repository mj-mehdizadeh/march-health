import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { registerBodyJoi, sendCodeBodyJoi } from './auth.joi';
import {
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  SendCodeDto,
} from './auth.dto';
import { MailService } from '../bootstrap/mail/mail.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  @Post('/register')
  @UsePipes(registerBodyJoi)
  @ApiResponse({ status: 201 })
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.registerUser(
      registerDto.email,
      registerDto.password,
    );
  }

  @Post('/code')
  @UsePipes(sendCodeBodyJoi)
  @ApiResponse({ status: 401, description: 'your account is blocked' })
  @ApiResponse({ status: 201 })
  async sendCode(@Body() sendCodeDto: SendCodeDto) {
    const user = await this.authService.validateUser(
      sendCodeDto.email,
      sendCodeDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    //todo send totp token in email
  }

  @Post('/login')
  @UsePipes(sendCodeBodyJoi)
  @ApiResponse({ status: 401, description: 'your account is blocked' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    if (!this.authService.verifyTotp(user, loginDto.totp)) {
      throw new UnauthorizedException('Invalid TOTP token');
    }
    return this.authService.login(user);
  }
}
