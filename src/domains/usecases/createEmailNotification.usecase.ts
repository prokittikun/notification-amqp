import { InfrastructuresAdapterDIToken } from "@applications/di/infrastructures/adapters";
import { CreateEmailNotificationParams } from "@domains/constants/types/notification.type";
import { IEmailServiceAdapter } from "@domains/interfaces/infrastructures/adapters/email/emailServiceAdapter.interface";
import { ICreateEmailNotificationUseCase } from "@domains/interfaces/usecases/createEmailNotification.interface";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CreateEmailNotificationUseCase
  implements ICreateEmailNotificationUseCase
{
  constructor(
    @Inject(InfrastructuresAdapterDIToken.EmailServiceAdaptor)
    private readonly emailServiceAdaptor: IEmailServiceAdapter
  ) {}
  async execute(params: CreateEmailNotificationParams): Promise<void> {
    const {
      keyEmailProvider,
      senderEmail,
      senderName,
      receiverEmails,
      payload,
      sendAt,
    } = params;

    await this.emailServiceAdaptor.sendEmail(
      receiverEmails,
      payload.subject,
      payload.message,
      keyEmailProvider
    );
  }
}
