import { InfrastructuresAdapterDIToken } from "@applications/di/infrastructures/adapters";
import { EmailServiceAdapter } from "@infrastructures/adapters/email/email.service";
import { MailhogService } from "@infrastructures/adapters/email/providers/mailer.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "localhost",
        port: 1025,
        secure: false,
        auth: null,
      },
      defaults: {
        from: '"No Reply" <no-reply@test.com>',
      },
    }),
  ],
  providers: [
    {
      provide: InfrastructuresAdapterDIToken.EmailServiceAdaptor,
      useClass: EmailServiceAdapter,
    },
    {
      provide: InfrastructuresAdapterDIToken.MailhogService,
      useClass: MailhogService,
    },
  ],
  exports: [InfrastructuresAdapterDIToken.EmailServiceAdaptor],
})
export class EmailAdaptorModule {}
