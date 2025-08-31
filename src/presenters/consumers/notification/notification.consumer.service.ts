import { MessageBrokerEventEnum } from "@domains/constants/enums/messageBroker.enum";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class NotificationConsumerService implements OnModuleInit {
  private readonly emailNotificationQueueName: string = "notification:email";

  constructor() {}

  onModuleInit() {
  }

  @OnEvent(MessageBrokerEventEnum.Connected, { async: true })
  async onInitialConsumeMessageBroker(){

  }
  
  async handleEmailMessageConsumer(){
    console.log("Email Notification Consumer is connected to the message broker.");
  }
}
