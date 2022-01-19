import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { UsersStatus } from '../../users/users.type';
import { UsersDocument } from '../../users/users.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<UsersDocument> {
    const user = await this.usersService.getById(payload.sub);
    if (!user || user.status !== UsersStatus.ACTIVE) {
      throw new UnauthorizedException('deactivated account');
    }
    return user;
  }
}
