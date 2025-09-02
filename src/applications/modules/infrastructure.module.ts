import { Module } from "@nestjs/common";
import { ConfigsModule } from "@applications/modules/infrastructures/configs.module";
import { AdaptersModule } from "./infrastructures/adapters.module";

@Module({
  imports: [ConfigsModule],
  exports: [ConfigsModule],
})
export class InfrastructureModule {}
