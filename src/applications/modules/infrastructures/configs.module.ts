import { Module } from '@nestjs/common';
import { EnvironmentsModule } from '@applications/modules/infrastructures/configs/environments.module';
import { MessageBrokerModule } from '@applications/modules/infrastructures/configs/messageBroker.module';

@Module({
    imports: [EnvironmentsModule, MessageBrokerModule],
    exports: [EnvironmentsModule, MessageBrokerModule],
})
export class ConfigsModule {}
