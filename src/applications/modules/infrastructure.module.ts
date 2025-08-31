import { Module } from '@nestjs/common';
import { ConfigsModule } from '@applications/modules/infrastructures/configs.module';

@Module({
    imports: [ConfigsModule],
    exports: [ConfigsModule],
})
export class InfrastructureModule {}
