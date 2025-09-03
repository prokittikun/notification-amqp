import { InfrastructuresAdapterDIToken } from "@applications/di/infrastructures/adapters";
import { EmailProviderEnum } from "@domains/constants/enums/emailProvider.enum";
import { IEmailServiceAdapter } from "@domains/interfaces/infrastructures/adapters/email/emailServiceAdapter.interface";
import { IMailhogService } from "@domains/interfaces/infrastructures/adapters/email/providers/mailhog.interface";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class EmailServiceAdapter implements IEmailServiceAdapter {
  constructor(
    @Inject(InfrastructuresAdapterDIToken.MailhogService)
    private readonly mailhogService: IMailhogService
  ) {}
  async sendEmail(
    to: string[],
    subject: string,
    body: string,
    provider: EmailProviderEnum
  ): Promise<void> {
    switch (provider) {
      case EmailProviderEnum.Mailhog:
        await this.mailhogService.sendMail(to, subject, body);
        break;
      default:
        throw new Error("Unsupported email provider");
    }
    return Promise.resolve();
  }
}
