import { Module, Provider } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { NotificationConsumerService } from "@presenters/consumers/notification/notification.consumer.service";
import { AdaptersModule } from "../infrastructures/adapters.module";

const presentersProvider: Provider[] = [NotificationConsumerService];

@Module({
  imports: [EventEmitterModule.forRoot(), AdaptersModule],
  providers: [...presentersProvider],
})
export class NotificationModule {}
