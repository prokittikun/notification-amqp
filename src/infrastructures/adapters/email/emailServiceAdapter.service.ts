import { EmailProviderEnum } from "@domains/constants/enums/emailProvider.enum";
import { EmailSendParams, IEmailService } from "@domains/interfaces/infrastructures/adapters/emailService.interface";
import { IMailhogService } from "@domains/interfaces/infrastructures/adapters/mailhogService.interface";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { InfrastructuresAdapterDIToken } from "@applications/di/infrastructures/adapters";

@Injectable()
export class EmailServiceAdapter implements IEmailService {
  private readonly logger = new Logger(EmailServiceAdapter.name);

  constructor(
    @Inject(InfrastructuresAdapterDIToken.MailhogService)
    private readonly mailhogService: IMailhogService,
  ) {}

  async sendEmail(params: EmailSendParams & { provider?: EmailProviderEnum }): Promise<void> {
    const provider = params.provider || EmailProviderEnum.MAILHOG;
    
    this.logger.log(`Sending email using provider: ${provider}`);

    switch (provider) {
      case EmailProviderEnum.MAILHOG:
        await this.mailhogService.sendEmail(params);
        break;
      case EmailProviderEnum.SMTP:
        // For future implementation
        throw new Error(`Email provider ${provider} not yet implemented`);
      case EmailProviderEnum.SENDGRID:
        // For future implementation
        throw new Error(`Email provider ${provider} not yet implemented`);
      case EmailProviderEnum.MAILGUN:
        // For future implementation
        throw new Error(`Email provider ${provider} not yet implemented`);
      default:
        throw new Error(`Unknown email provider: ${provider}`);
    }
  }
}