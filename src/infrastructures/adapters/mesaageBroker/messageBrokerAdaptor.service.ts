import {
  BrokerMessageParams,
  BrokerChannelParams,
  BrokerConsumerOptionsParams,
  BrokerPublisherOptionsParams,
  BrokerPublisherDataParams,
} from "@domains/constants/types/messageBroker.type";
import { IMessageBrokerServiceAdapter } from "@domains/interfaces/infrastructures/adapters/messageBroker.interface";
import { IMessageBrokerInstance } from "@domains/interfaces/infrastructures/configs/messageBroker.interface";
import { Injectable } from "@nestjs/common";
import { isUndefined } from "lodash";

@Injectable()
export class MessageBrokerAdapterService
  implements IMessageBrokerServiceAdapter
{
  constructor(private readonly brokerMessageInstance: IMessageBrokerInstance) {}

  async consumers(
    queueName: string,
    callback: (
      message: BrokerMessageParams,
      channel: BrokerChannelParams
    ) => void,
    options?: BrokerConsumerOptionsParams
  ): Promise<void> {
    if (isUndefined(this.brokerMessageInstance.channel)) return;
    
    await this.brokerMessageInstance.channel.assertQueue(queueName, {
      durable: true,
    });
    await this.brokerMessageInstance.channel.prefetch(1);
    await this.brokerMessageInstance.channel.consume(
      queueName,
      async (message) => callback(message, this.brokerMessageInstance.channel),
      options
    );
  }

  async publisher<TData>(
    queueName: string,
    data: BrokerPublisherDataParams<TData>,
    options?: BrokerPublisherOptionsParams
  ): Promise<void> {
    this.brokerMessageInstance.channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(data)),
      options
    );
  }
}
