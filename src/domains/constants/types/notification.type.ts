import { Nullable } from "@utils/commonTypes";
import { EmailProviderEnum } from "../enums/emailProvider.enum";

export type EmailBodyParams = {
  subject: string;
  message: string;
  // attachments: MailAttachmentParams[];
};

export type CreateEmailNotificationParams = {
  keyEmailProvider: EmailProviderEnum;
  senderEmail: string;
  senderName: string;
  receiverEmails: string[];
  payload: EmailBodyParams;
  sendAt: Nullable<Date>;
};