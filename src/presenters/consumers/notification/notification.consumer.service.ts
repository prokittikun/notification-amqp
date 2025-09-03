import { NotificationDIToken } from "@applications/di/domains/notification.di";
import { InfrastructuresAdapterDIToken } from "@applications/di/infrastructures/adapters";
import { CreateEmailNotificationDto } from "@domains/constants/dtos/notifications.dto";
import { MessageBrokerEventEnum } from "@domains/constants/enums/messageBroker.enum";
import {
  BrokerChannelParams,
  BrokerMessageParams,
} from "@domains/constants/types/messageBroker.type";
import { IMessageBrokerServiceAdapter } from "@domains/interfaces/infrastructures/adapters/messageBroker.interface";
import { ICreateEmailNotificationUseCase } from "@domains/interfaces/usecases/createEmailNotification.interface";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ConsumerHandler, MessageBody } from "@presenters/consumers/decorator";

@Injectable()
export class NotificationConsumerService implements OnModuleInit {
  private readonly emailNotificationQueueName: string =
    "test:notification:email";

  constructor(
    @Inject(InfrastructuresAdapterDIToken.MessageBrokerServiceAdapter)
    private readonly messageBrokerServiceAdapter: IMessageBrokerServiceAdapter,
    @Inject(NotificationDIToken.CreateEmailNotificationUseCase)
    private readonly createEmailNotificationUseCase: ICreateEmailNotificationUseCase
  ) {}

  onModuleInit() {
    this.onInitialConsumeMessageBroker();
  }

  @OnEvent(MessageBrokerEventEnum.Connected, { async: true })
  async onInitialConsumeMessageBroker() {
    console.log("Initial consumers");
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
    const createEmailNotificationParams = message.toJson();
    await this.createEmailNotificationUseCase.execute(createEmailNotificationParams);
  }
}
