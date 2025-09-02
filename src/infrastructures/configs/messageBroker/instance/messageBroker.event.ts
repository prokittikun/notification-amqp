import { MessageBrokerEventEnum } from "@domains/constants/enums/messageBroker.enum";
import { IMessageBrokerEventEmitter } from "@domains/interfaces/infrastructures/configs/messageBroker.interface";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class MessageBrokerEventEmitter implements IMessageBrokerEventEmitter {
    constructor(private eventEmitter: EventEmitter2) {}

    sendEventConnection(event: string): void {
        this.eventEmitter.emit(event, "connected");
    }
}