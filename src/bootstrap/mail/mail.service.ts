import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendLogs(logs: any) {
    await this.mailerService.sendMail({
      to: this.configService.get('LOG_MAIL_ADDRESS'),
      subject: 'Service Log',
      template: './logs',
      context: {
        date: new Date(),
        logs: JSON.stringify(logs),
      },
    });
  }
}
