import { IEnvironments } from "@domains/interfaces/infrastructures/configs/environment.interface";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvironmentsService implements IEnvironments {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    const _port = this.configService.get("PORT") || 5000;
    return Number(_port);
  }

  get amqpURI(): string {
    return this.configService.get("AMQP_URI");
  }
}
