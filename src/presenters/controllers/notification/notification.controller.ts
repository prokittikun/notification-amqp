import { Body, Controller, Post, Inject } from '@nestjs/common';
import { InfrastructuresAdapterDIToken } from '@applications/di/infrastructures/adapters';
import { IMessageBrokerServiceAdapter } from '@domains/interfaces/infrastructures/adapters/messageBroker.interface';
import { CreateEmailNotificationDto } from '@domains/constants/dtos/notifications.dto';

@Controller('notification')
export class NotificationController {
  constructor(
    @Inject(InfrastructuresAdapterDIToken.MessageBrokerServiceAdapter)
    private readonly messageBrokerServiceAdapter: IMessageBrokerServiceAdapter,
  ) {}

  @Post('email')
  async sendEmailNotification(@Body() createEmailDto: CreateEmailNotificationDto) {
    // Publish the message to the email notification queue
    await this.messageBrokerServiceAdapter.publisher(
      'test:notification:email',
      JSON.stringify(createEmailDto),
      { persistent: true }
    );

    return {
      message: 'Email notification queued successfully',
      data: createEmailDto,
    };
  }
}
