import { Module, Provider } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { NotificationConsumerService } from "@presenters/consumers/notification/notification.consumer.service";
import { NotificationController } from "@presenters/controllers/notification/notification.controller";
import { AdaptersModule } from "../infrastructures/adapters.module";
import { CreateEmailNotificationUseCase } from "@domains/usecases/createEmailNotification.usecase";
import { NotificationDIToken } from "@applications/di/domains/notification.di";

const presentersProvider: Provider[] = [NotificationConsumerService];

const useCasesProvider: Provider[] = [
  {
    provide: NotificationDIToken.CreateEmailNotificationUseCase,
    useClass: CreateEmailNotificationUseCase,
  },
];

@Module({
  imports: [EventEmitterModule.forRoot(), AdaptersModule],
  controllers: [NotificationController],
  providers: [...presentersProvider, ...useCasesProvider],
  exports: [...useCasesProvider],
})
export class NotificationModule {}
