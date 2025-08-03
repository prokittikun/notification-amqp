import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HealthModule } from '@applications/modules/domains/health.module';

@Module({
    imports: [EventEmitterModule.forRoot(), HealthModule],
})
export class DomainModule {}
