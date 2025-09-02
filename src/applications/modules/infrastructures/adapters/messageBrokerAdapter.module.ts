import { Module } from "@nestjs/common";
import { MessageBrokerModule } from "@applications/modules/infrastructures/configs/messageBroker.module";
import { InfrastructuresAdapterDIToken } from "@applications/di/infrastructures/adapters";
import { InfrastructuresConfigDIToken } from "@applications/di/infrastructures/configs";
import { IMessageBrokerInstance } from "@domains/interfaces/infrastructures/configs/messageBroker.interface";
import { MessageBrokerAdapterService } from "@infrastructures/adapters/mesaageBroker/messageBrokerAdaptor.service";

@Module({
  imports: [MessageBrokerModule],
  providers: [
    {
      provide: InfrastructuresAdapterDIToken.MessageBrokerServiceAdapter,
      inject: [InfrastructuresConfigDIToken.MessageBrokerInstanceService],
      useFactory: (brokerMessageInstance: IMessageBrokerInstance) =>
        new MessageBrokerAdapterService(brokerMessageInstance),
    },
  ],
  exports: [InfrastructuresAdapterDIToken.MessageBrokerServiceAdapter],
})
export class MessageBrokerAdapterModule {}
