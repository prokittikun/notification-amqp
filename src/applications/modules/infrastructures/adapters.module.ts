import { Module } from "@nestjs/common";
import { MessageBrokerAdapterModule } from "./adapters/messageBrokerAdapter.module";
import { EmailAdaptorModule } from "./adapters/emailAdapter.module";

@Module({
  imports: [MessageBrokerAdapterModule, EmailAdaptorModule],
  exports: [MessageBrokerAdapterModule, EmailAdaptorModule],
})
export class AdaptersModule {}
