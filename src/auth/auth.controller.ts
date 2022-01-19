import { Body, Controller, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiResponse } from "@nestjs/swagger";
import { registerBodyJoi, sendCodeBodyJoi } from "./auth.joi";
import { RegisterDto, SendCodeDto } from "./auth.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }

  @Post("/register")
  @UsePipes(registerBodyJoi)
  @ApiResponse({ status: 201 })
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.registerUser(registerDto.email, registerDto.password);
  }

  @Post("/code")
  @UsePipes(sendCodeBodyJoi)
  @ApiResponse({ status: 401, description: "your account is blocked" })
  @ApiResponse({ status: 201 })
  async sendCode(@Body() sendCodeDto: SendCodeDto) {
  }
}
