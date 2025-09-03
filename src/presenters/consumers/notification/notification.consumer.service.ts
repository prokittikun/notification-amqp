import { InfrastructuresAdapterDIToken } from "@applications/di/infrastructures/adapters";
import { NotificationDIToken } from "@applications/di/domains/notification.di";
import { CreateEmailNotificationDto } from "@domains/constants/dtos/notifications.dto";
import { MessageBrokerEventEnum } from "@domains/constants/enums/messageBroker.enum";
import {
  BrokerChannelParams,
  BrokerMessageParams,
} from "@domains/constants/types/messageBroker.type";
import { IMessageBrokerServiceAdapter } from "@domains/interfaces/infrastructures/adapters/messageBroker.interface";
import { ICreateEmailNotificationUseCase } from "@domains/interfaces/usecases/createEmailNotification.interface";
import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ConsumerHandler, MessageBody } from "@presenters/consumers/decorator";

@Injectable()
export class NotificationConsumerService implements OnModuleInit {
  private readonly logger = new Logger(NotificationConsumerService.name);
  private readonly emailNotificationQueueName: string =
    "test:notification:email";

  constructor(
    @Inject(InfrastructuresAdapterDIToken.MessageBrokerServiceAdapter)
    private readonly messageBrokerServiceAdapter: IMessageBrokerServiceAdapter,
    @Inject(NotificationDIToken.CreateEmailNotificationUseCase)
    private readonly createEmailNotificationUseCase: ICreateEmailNotificationUseCase,
  ) {}

  onModuleInit() {
    this.onInitialConsumeMessageBroker();
  }

  @OnEvent(MessageBrokerEventEnum.Connected, { async: true })
  async onInitialConsumeMessageBroker() {
    this.logger.log("Initial consumers");
    this.messageBrokerServiceAdapter.consumers(
      this.emailNotificationQueueName,
      this.handleEmailMessageConsumer.bind(this),
      { noAck: false }
    );
  }

  @ConsumerHandler({
    isAck: true,
  })
  async handleEmailMessageConsumer(
    @MessageBody(CreateEmailNotificationDto)
    message: CreateEmailNotificationDto
  ) {
    this.logger.log("Received email notification message:", message);
    
    try {
      // Transform DTO to use case parameters
      await this.createEmailNotificationUseCase.execute({
        keyEmailProvider: message.keyEmailProvider,
        senderEmail: message.senderEmail,
        senderName: message.senderName || 'No-Reply',
        receiverEmails: message.receiverEmails,
        payload: {
          subject: message.payload.subject,
          message: message.payload.message,
        },
        sendAt: message.sendAt,
      });

      this.logger.log("Email notification processed successfully");
    } catch (error) {
      this.logger.error("Failed to process email notification:", error);
      throw error; // Re-throw to handle message acknowledgment appropriately
    }
  }
}
