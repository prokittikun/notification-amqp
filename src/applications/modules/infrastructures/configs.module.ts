import { Module } from '@nestjs/common';
import { EnvironmentsModule } from '@applications/modules/infrastructures/configs/environments.module';

@Module({
    imports: [EnvironmentsModule],
})
export class ConfigsModule {}
