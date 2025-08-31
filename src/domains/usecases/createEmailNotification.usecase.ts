import { CreateEmailNotificationParams } from "@domains/constants/types/notification.type";
import { ICreateEmailNotificationUseCase } from "@domains/interfaces/usecases/createEmailNotification.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateEmailNotificationUseCase implements ICreateEmailNotificationUseCase {

    execute(params: CreateEmailNotificationParams): Promise<void> {
        return;
    }

}