import { CreateEmailNotificationParams } from "@domains/constants/types/notification.type";
import { ICreateEmailNotificationUseCase } from "@domains/interfaces/usecases/createEmailNotification.interface";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { InfrastructuresAdapterDIToken } from "@applications/di/infrastructures/adapters";
import { EmailServiceAdapter } from "@infrastructures/adapters/email/emailServiceAdapter.service";

@Injectable()
export class CreateEmailNotificationUseCase implements ICreateEmailNotificationUseCase {
    private readonly logger = new Logger(CreateEmailNotificationUseCase.name);

    constructor(
        @Inject(InfrastructuresAdapterDIToken.EmailServiceAdapter)
        private readonly emailServiceAdapter: EmailServiceAdapter,
    ) {}

    async execute(params: CreateEmailNotificationParams): Promise<void> {
        this.logger.log('Creating email notification', { 
            receiverEmails: params.receiverEmails, 
            subject: params.payload.subject,
            provider: params.keyEmailProvider 
        });

        try {
            // If sendAt is specified and in the future, we could implement scheduling
            // For now, we'll send immediately regardless of sendAt
            await this.emailServiceAdapter.sendEmail({
                senderEmail: params.senderEmail,
                senderName: params.senderName,
                receiverEmails: params.receiverEmails,
                subject: params.payload.subject,
                message: params.payload.message,
                provider: params.keyEmailProvider,
            });

            this.logger.log('Email notification sent successfully');
        } catch (error) {
            this.logger.error('Failed to send email notification', error);
            throw new Error(`Failed to create email notification: ${error.message}`);
        }
    }
}