import { Module, Provider } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { NotificationConsumerService } from "@presenters/consumers/notification/notification.consumer.service";

const presentersProvider: Provider[] = [NotificationConsumerService];

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [...presentersProvider],
})
export class NotificationModule {}
