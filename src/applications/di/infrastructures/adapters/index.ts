export class InfrastructuresAdapterDIToken {
  static readonly MessageBrokerServiceAdapter: unique symbol = Symbol(
    "MessageBrokerServiceAdaptor"
  );

  static readonly EmailServiceAdaptor: unique symbol = Symbol(
    "EmailServiceAdaptor"
  );
  static readonly MailhogService: unique symbol = Symbol("MailhogService");
}
