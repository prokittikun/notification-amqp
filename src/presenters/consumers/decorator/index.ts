import {
  BrokerChannelParams,
  BrokerErrorConsumerHandlerParams,
  BrokerMessageParams,
} from "@domains/constants/types/messageBroker.type";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { isNumber, isString, isUndefined } from "lodash";

const MESSAGE_BODY = Symbol("MESSAGE_BODY");
const MESSAGE_CONSTRUCTOR_BODY = Symbol("MESSAGE_CONSTRUCTOR_BODY");

export function MessageBody(params: ClassConstructor<any>): ParameterDecorator {
  return (
    target: object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    const existingParameters: number[] =
      Reflect.getOwnMetadata(MESSAGE_BODY, target, propertyKey) || [];
    existingParameters.push(parameterIndex);
    Reflect.defineMetadata(
      MESSAGE_BODY,
      existingParameters,
      target,
      propertyKey
    );

    const existingParameterTypes: Record<
      number,
      ClassConstructor<any> | string
    > =
      Reflect.getOwnMetadata(MESSAGE_CONSTRUCTOR_BODY, target, propertyKey) ||
      {};
    existingParameterTypes[parameterIndex] = params;
    Reflect.defineMetadata(
      MESSAGE_CONSTRUCTOR_BODY,
      existingParameterTypes,
      target,
      propertyKey
    );
  };
}

export function ConsumerHandler(
  params: {
    isAck?: boolean;
    onError?: BrokerErrorConsumerHandlerParams;
  } = {
    isAck: true,
  }
) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = async function (
      ...args: [BrokerMessageParams, BrokerChannelParams]
    ) {
      const [message, channel] = args;
      const isAckMessage = isUndefined(params?.isAck) ? true : params.isAck;

      const messageBodyParameters: number[] =
        Reflect.getOwnMetadata(MESSAGE_BODY, target, propertyKey) || [];
      const messageBodyTypeParameters: Record<
        number,
        ClassConstructor<any> | string
      > = Reflect.getOwnMetadata(MESSAGE_CONSTRUCTOR_BODY, target, propertyKey);

      const newArguments = Array.from({
        length: messageBodyParameters.length,
      });

      try {
        for (const indexParameter of messageBodyParameters) {
          const content = String(message.content);
          const bodyDataType = messageBodyTypeParameters[indexParameter];
          
          if (isString(bodyDataType) || bodyDataType === String) {
            newArguments[indexParameter] = content;
          } else if (isNumber(bodyDataType) || bodyDataType === Number) {
            newArguments[indexParameter] = Number(content);
          } else {
            const contentObject = plainToInstance(
              bodyDataType,
              JSON.parse(content || "{}")
            );
            newArguments[indexParameter] = contentObject;
          }
        }
        
        await original.apply(this, newArguments);
        if (isAckMessage) {
          channel.ack(message);
        }
      } catch (error) {
        console.log("Error handling message:", error);
      }
    };
  };
}
