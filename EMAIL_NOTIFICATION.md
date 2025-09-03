# Email Notification Feature

This document describes the email notification feature implementation.

## Features

### Core Components

1. **EmailProviderEnum**: Supports multiple email providers (Mailhog, SMTP, SendGrid, Mailgun)
2. **BaseNotificationDto**: Base DTO with common fields for all notifications
3. **EmailServiceAdapter**: Handles email provider switching and routing
4. **MailhogService**: Implementation for Mailhog email service (development)
5. **CreateEmailNotificationUseCase**: Business logic for processing email notifications
6. **NotificationConsumerService**: AMQP consumer for processing queued email messages

### API Endpoints

#### Send Email Notification
```
POST /notification/email
```

**Request Body:**
```json
{
  "keyEmailProvider": "mailhog",
  "senderEmail": "sender@example.com",
  "senderName": "Sender Name",
  "receiverEmails": ["recipient1@example.com", "recipient2@example.com"],
  "payload": {
    "subject": "Email Subject",
    "message": "Email message content"
  },
  "sendAt": null
}
```

**Response:**
```json
{
  "message": "Email notification queued successfully",
  "data": {
    // Request data echoed back
  }
}
```

### Environment Variables

```env
PORT=3000
AMQP_URI=amqp://localhost
MAILHOG_HOST=localhost
MAILHOG_PORT=1025
```

### Architecture

The email notification system follows clean architecture principles:

1. **Controllers** receive HTTP requests and queue messages
2. **Consumers** process AMQP messages asynchronously
3. **Use Cases** contain business logic
4. **Adapters** abstract email provider implementations
5. **Services** handle specific email provider integrations

### Message Flow

1. HTTP request received at `/notification/email`
2. Message queued to `test:notification:email` AMQP queue
3. NotificationConsumerService processes the message
4. CreateEmailNotificationUseCase executes the business logic
5. EmailServiceAdapter routes to appropriate provider
6. Email sent via configured provider (Mailhog by default)

### Testing

The feature can be tested by:
1. Starting the application: `npm run dev`
2. Sending a POST request to `/notification/email`
3. Checking logs for email processing confirmation

Note: AMQP server (RabbitMQ) is required for full functionality.