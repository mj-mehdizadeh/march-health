import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'test@mail.com' })
  email: string;
  @ApiProperty()
  password: string;
}

export class SendCodeDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
