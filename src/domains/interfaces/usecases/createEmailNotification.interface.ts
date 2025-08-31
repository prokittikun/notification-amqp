import { CreateEmailNotificationParams } from "@domains/constants/types/notification.type";
import { IBaseUseCase } from "./base.interface";

export interface ICreateEmailNotificationUseCase extends IBaseUseCase<CreateEmailNotificationParams, void> {}