import { HealthModule } from "@applications/modules/domains/health.module";
import { Module } from "@nestjs/common";
import { NotificationModule } from "./domains/notification.module";

@Module({
  imports: [NotificationModule, HealthModule],
})
export class DomainModule {}
