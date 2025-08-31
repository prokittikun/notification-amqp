import { Nullable } from "@utils/commonTypes";

export type EmailBodyParams = {
  subject: string;
  message: string;
  // attachments: MailAttachmentParams[];
};

export type CreateEmailNotificationParams = {
  keyEmailProvider: string;
  senderEmail: string;
  senderName: string;
  receiverEmails: string[];
  payload: EmailBodyParams;
  sendAt: Nullable<Date>;
};