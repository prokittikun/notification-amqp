import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  BrokerChannelParams,
  BrokerConnectionParams,
} from "@domains/constants/types/messageBroker.type";
import {
  IMessageBrokerEventEmitter,
  IMessageBrokerInstance,
} from "@domains/interfaces/infrastructures/configs/messageBroker.interface";
import { connect as ampConnection, ChannelModel } from "amqplib";
import ms from "ms";
import { InfrastructuresConfigDIToken } from "@applications/di/infrastructures/configs";
import { IEnvironments } from "@domains/interfaces/infrastructures/configs/environment.interface";
import { MessageBrokerEventEnum } from "@domains/constants/enums/messageBroker.enum";
import { isNil, isNumber } from "lodash";

@Injectable()
export class MessageBrokerInstanceService
  implements OnModuleInit, IMessageBrokerInstance
{
  private _connection: BrokerConnectionParams;
  private _channel: BrokerChannelParams;
  private _retryConnection = 0;
  private _isExceedConnectionError = false;

  private delayTime: number;
  private maxRetryConnection: number | undefined;

  constructor(
    @Inject(InfrastructuresConfigDIToken.EnvironmentService)
    private readonly environment: IEnvironments,
    @Inject(InfrastructuresConfigDIToken.MessageBrokerEventEmitter)
    private readonly messageBrokerEventEmitter: IMessageBrokerEventEmitter
  ) {}

  async onModuleInit() {
    this.delayTime = ms("5s");
    this.maxRetryConnection = 5;
    console.log("Connecting to RabbitMQ...");
    await this.connect();
  }

  private async connect() {
    try {
      console.log("Attempting to connect to RabbitMQ...");

      this._retryConnection += 1;
      this._connection = await ampConnection(
        `${this.environment.amqpURI}?heartbeat=${60}`
      );

      this._channel = await this._connection.createChannel();

      console.log("Connected to RabbitMQ successfully");

      this._retryConnection = 0;
      this._isExceedConnectionError = false;
      this.messageBrokerEventEmitter.sendEventConnection(
        MessageBrokerEventEnum.Connected
      );

      this._connection.on("error", async (err) => {
        console.error("RabbitMQ connection error", err);
        await this.reconnect();
      });

      this._connection.on("close", async () => {
        console.warn("RabbitMQ connection closed");
        await this.reconnect();
      });
    } catch (error) {
      console.error("Failed to connect to RabbitMQ", error);
      setTimeout(() => this.reconnect(), this.delayTime);
    }
  }

  private async reconnect() {
    console.log("Attempting to reconnect to RabbitMQ...");
    if (
      isNumber(this.maxRetryConnection) &&
      this._retryConnection >= this.maxRetryConnection
    ) {
      console.log("Failed to disconnect from RabbitMQ after maximum retries");
      this._isExceedConnectionError = true;
      await this.disconnect();
    }
    setTimeout(() => this.connect(), this.delayTime);
  }

  async disconnect() {
    try {
      if (!isNil(this._channel)) await this._channel?.close();
      if (!isNil(this._connection)) await this._connection?.close();
      console.log("Disconnected from RabbitMQ");
    } catch (error) {
      console.error("Failed to disconnect from RabbitMQ", error);
    }
  }

  get connection(): BrokerConnectionParams {
    return this._connection;
  }

  get channel(): BrokerChannelParams {
    if (!this._channel) {
      throw new Error(
        "Channel is not initialized. Make sure the connection is established first."
      );
    }
    return this._channel;
  }
}
