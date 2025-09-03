export class NotificationDIToken {
  static readonly NotificationService: unique symbol = Symbol(
    "NotificationService"
  );
  static readonly CreateEmailNotificationUseCase: unique symbol = Symbol(
    "CreateEmailNotificationUseCase"
  );
}
