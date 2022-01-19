import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendOtpCode(to: string, code: string) {
    await this.mailerService.sendMail({
      to: to,
      subject: 'Otp Code For March-Health',
      template: 'two-step-code',
      context: { code },
    });
  }
}
