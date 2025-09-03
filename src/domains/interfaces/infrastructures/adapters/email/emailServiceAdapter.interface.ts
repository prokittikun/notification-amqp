import { EmailProviderEnum } from "@domains/constants/enums/emailProvider.enum";

export interface IEmailServiceAdapter {
  sendEmail(
    to: string[],
    subject: string,
    body: string,
    provider: EmailProviderEnum
  ): Promise<void>;
}
