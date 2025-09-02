import { Channel, Message, Options, Connection, ChannelModel } from "amqplib";

export type BrokerConnectionParams = ChannelModel;
export type BrokerChannelParams = Channel;
export type BrokerMessageParams = Message;
export type BrokerConsumerOptionsParams = Options.Consume;
export type BrokerPublisherOptionsParams = Options.Publish;
export type BrokerPublisherDataParams<T> = T | object | string | number;

export type BrokerErrorConsumerHandlerParams = (
  error: Error,
  message: BrokerMessageParams,
  channel: BrokerChannelParams
) => Promise<void>;
