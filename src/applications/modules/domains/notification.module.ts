import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { NotificationConsumerService } from "@presenters/consumers/notification/notification.consumer.service";
import { MessageBrokerAdapterModule } from "../infrastructures/adapters/messageBrokerAdapter.module";
import { CreateEmailNotificationUseCase } from "@domains/usecases/createEmailNotification.usecase";
import { NotificationDIToken } from "@applications/di/domains/notification.di";
import { EmailAdaptorModule } from "../infrastructures/adapters/emailAdapter.module";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    MessageBrokerAdapterModule,
    EmailAdaptorModule,
  ],
  providers: [
    NotificationConsumerService,
    {
      provide: NotificationDIToken.CreateEmailNotificationUseCase,
      useClass: CreateEmailNotificationUseCase,
    },
  ],
})
export class NotificationModule {}
