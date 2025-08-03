import { Module } from "@nestjs/common";
import { EnvironmentsService } from "@infrastructures/configs/environments/environments.service";
import { ConfigModule } from "@nestjs/config";
import { InfrastructuresConfigDIToken } from "@applications/di/infrastructures/configs/";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  providers: [{
    provide: InfrastructuresConfigDIToken.EnvironmentService,
    useClass: EnvironmentsService,
  }],
})
export class EnvironmentsModule {}
