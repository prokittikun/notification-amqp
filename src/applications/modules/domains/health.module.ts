import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { NotificationDIToken } from "@applications/di/domains/notification.di";
import { HealthController } from "@root/presenters/controllers/health/health.controller";

@Module({
  imports: [],
  controllers: [HealthController],
})
export class HealthModule {}
