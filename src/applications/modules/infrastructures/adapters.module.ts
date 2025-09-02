import { Module } from "@nestjs/common";
import { MessageBrokerAdapterModule } from "./adapters/messageBrokerAdapter.module";

@Module({
  imports: [MessageBrokerAdapterModule],
  exports: [MessageBrokerAdapterModule],
})
export class AdaptersModule {}
