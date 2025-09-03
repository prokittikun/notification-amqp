import { IMailhogService } from "@domains/interfaces/infrastructures/adapters/email/providers/mailhog.interface";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailhogService implements IMailhogService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string[], subject: string, body: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      html: body,
    });
    console.log(`Send email ${to.join(",")}, by self provider Mailhog`);
  }
}
