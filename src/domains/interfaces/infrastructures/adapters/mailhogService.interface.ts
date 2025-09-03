import { EmailSendParams, IEmailService } from "./emailService.interface";

export interface IMailhogService extends IEmailService {
  sendEmail(params: EmailSendParams): Promise<void>;
  getServerInfo(): Promise<{ host: string; port: number }>;
}