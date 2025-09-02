import {
  BrokerChannelParams,
  BrokerConsumerOptionsParams,
  BrokerMessageParams,
  BrokerPublisherOptionsParams,
} from "@domains/constants/types/messageBroker.type";

export interface IMessageBrokerServiceAdapter {
  consumers(
    queueName: string,
    callback: (
      message: BrokerMessageParams,
      channel: BrokerChannelParams
    ) => Promise<void>,
    options?: BrokerConsumerOptionsParams
  ): Promise<void>;

  publisher<TData>(
    queueName: string,
    data: TData | string | object,
    options?: BrokerPublisherOptionsParams
  ): Promise<void>;
}
