export interface EmailSendParams {
  senderEmail: string;
  senderName?: string;
  receiverEmails: string[];
  subject: string;
  message: string;
}

export interface IEmailService {
  sendEmail(params: EmailSendParams): Promise<void>;
}