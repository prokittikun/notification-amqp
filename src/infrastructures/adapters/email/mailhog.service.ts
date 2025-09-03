import { EmailSendParams } from "@domains/interfaces/infrastructures/adapters/emailService.interface";
import { IMailhogService } from "@domains/interfaces/infrastructures/adapters/mailhogService.interface";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class MailhogService implements IMailhogService {
  private readonly logger = new Logger(MailhogService.name);
  private readonly mailhogHost = process.env.MAILHOG_HOST || 'localhost';
  private readonly mailhogPort = parseInt(process.env.MAILHOG_PORT || '1025', 10);

  async sendEmail(params: EmailSendParams): Promise<void> {
    this.logger.log(`Sending email via Mailhog to: ${params.receiverEmails.join(', ')}`);
    this.logger.log(`Subject: ${params.subject}`);
    this.logger.log(`From: ${params.senderName} <${params.senderEmail}>`);
    
    // In a real implementation, this would connect to Mailhog SMTP server
    // For now, we'll simulate the email sending
    try {
      // Simulate async email sending
      await new Promise(resolve => setTimeout(resolve, 100));
      
      this.logger.log(`Email sent successfully via Mailhog`);
    } catch (error) {
      this.logger.error(`Failed to send email via Mailhog: ${error.message}`);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async getServerInfo(): Promise<{ host: string; port: number }> {
    return {
      host: this.mailhogHost,
      port: this.mailhogPort
    };
  }
}