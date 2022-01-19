import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { loginBodyJoi, registerBodyJoi, sendCodeBodyJoi } from './auth.joi';
import {
  LoginDto,
  LoginResponseDto,
  RegisterDto,
  SendCodeDto,
} from './auth.dto';
import { MailService } from '../bootstrap/mail/mail.service';

@ApiTags('auth')
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
    try {
      await this.authService.registerUser(
        registerDto.email,
        registerDto.password,
      );
    } catch (e) {
      if (e.code === 11000)
        throw new BadRequestException('duplicate email address');
      throw e;
    }
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
    const otpToken = await this.authService.totpToken(user);
    this.mailService.sendOtpCode(sendCodeDto.email, otpToken);
  }

  @Post('/login')
  @UsePipes(loginBodyJoi)
  @ApiResponse({ status: 401, description: 'Invalid username or password' })
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
