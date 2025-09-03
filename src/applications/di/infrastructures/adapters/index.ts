export class InfrastructuresAdapterDIToken {
  static readonly MessageBrokerServiceAdapter: unique symbol = Symbol(
    "MessageBrokerServiceAdaptor"
  );
  static readonly EmailServiceAdapter: unique symbol = Symbol(
    "EmailServiceAdapter"
  );
  static readonly MailhogService: unique symbol = Symbol(
    "MailhogService"
  );
}
