import { ApiProperty } from '@nestjs/swagger';
import { UsersStatus, UsersRole } from '../users/users.type';

export class AuthUser {
  id: string;
  status: UsersStatus;
  role: UsersRole;
}

export class RegisterDto {
  @ApiProperty({ example: 'test@mail.com' })
  email: string;
  @ApiProperty()
  password: string;
}

export class SendCodeDto {
  @ApiProperty({ example: 'test@mail.com' })
  email: string;
  @ApiProperty()
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'test@mail.com' })
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  totp: string;
}

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;
}
