import { Module } from "@nestjs/common";
import { EmailServiceAdapter } from "@infrastructures/adapters/email/emailServiceAdapter.service";
import { MailhogService } from "@infrastructures/adapters/email/mailhog.service";
import { InfrastructuresAdapterDIToken } from "@applications/di/infrastructures/adapters";

@Module({
  providers: [
    {
      provide: InfrastructuresAdapterDIToken.EmailServiceAdapter,
      useClass: EmailServiceAdapter,
    },
    {
      provide: InfrastructuresAdapterDIToken.MailhogService,
      useClass: MailhogService,
    },
  ],
  exports: [
    InfrastructuresAdapterDIToken.EmailServiceAdapter,
    InfrastructuresAdapterDIToken.MailhogService,
  ],
})
export class EmailAdaptorModule {}