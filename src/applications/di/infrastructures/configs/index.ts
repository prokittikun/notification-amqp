export class InfrastructuresConfigDIToken {
    static readonly EnvironmentService: unique symbol = Symbol('EnvironmentService');

    static readonly MessageBrokerInstanceService: unique symbol = Symbol('MessageBrokerInstanceService');
    static readonly MessageBrokerEventEmitter: unique symbol = Symbol('MessageBrokerEvent');
}