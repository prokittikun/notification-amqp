import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { IEnvironments } from "@domains/interfaces/infrastructures/configs/environment.interface";
import { InfrastructuresConfigDIToken } from "./di/infrastructures/configs";

export class ServerApplication {
  private static instance: ServerApplication;

  public static new() {
    if (!ServerApplication.instance) {
      ServerApplication.instance = new ServerApplication();
    }
    return ServerApplication.instance;
  }

  async run(): Promise<void> {
    const app = await  NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    const environmentService = app.get<symbol, IEnvironments>(InfrastructuresConfigDIToken.EnvironmentService);

    const { port } = environmentService;

    await app.listen(port, '0.0.0.0');

  }
}
