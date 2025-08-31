import { BrokerChannelParams, BrokerConnectionParams } from "@domains/constants/types/messageBroker.type";
import { Optional } from "@utils/commonTypes";

export interface IMessageBrokerInstance {
  channel: Optional<BrokerChannelParams>;
  connection: Optional<BrokerConnectionParams>;
}

export interface IMessageBrokerEventEmitter {
  sendEventConnection(event: string): void;
}