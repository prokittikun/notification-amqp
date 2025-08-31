import { Module } from "@nestjs/common";
import { EnvironmentsModule } from "@applications/modules/infrastructures/configs/environments.module";
import { InfrastructuresConfigDIToken } from "@applications/di/infrastructures/configs";
import { MessageBrokerInstanceService } from "@infrastructures/configs/messageBroker/messageBrokerInstance.service";
import { MessageBrokerEventEmitter } from "@infrastructures/configs/messageBroker/messageBroker.event";

@Module({
  imports: [EnvironmentsModule],
  providers: [
    {
      provide: InfrastructuresConfigDIToken.MessageBrokerInstanceService,
      useClass: MessageBrokerInstanceService,
    },
    {
      provide: InfrastructuresConfigDIToken.MessageBrokerEventEmitter,
      useClass: MessageBrokerEventEmitter
    }
  ],
  exports: [
    InfrastructuresConfigDIToken.MessageBrokerInstanceService,
    InfrastructuresConfigDIToken.MessageBrokerEventEmitter
  ]
})
export class MessageBrokerModule {}
