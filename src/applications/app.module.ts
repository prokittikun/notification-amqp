import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@applications/modules/infrastructure.module';
import { DomainModule } from '@applications/modules/domain.module';

@Module({
    imports: [InfrastructureModule, DomainModule]
})
export class AppModule {}
