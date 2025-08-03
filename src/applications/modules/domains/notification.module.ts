import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { NotificationDIToken } from "@applications/di/domains/notification.di";

@Module({
  imports: [],
  controllers: [
    // NotificationInApplicationController
  ],
  providers: [
    // {
    //   provide: NotificationDIToken.NotificationService,
    //   useClass: CreateInApplicationNotificationUseCase,
    // },
  ],
})
export class NotificationModule {}
