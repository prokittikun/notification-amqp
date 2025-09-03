import { Nullable } from "@utils/commonTypes";
import { Transform, Type } from "class-transformer";
import dayjs from "dayjs";
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsInstance,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { BaseNotificationDto } from "./base.dto";
import { EmailProviderEnum } from "../enums/emailProvider.enum";

export class EmailPayloadDto {
  @IsString()
  subject: string;

  @IsString()
  message: string;
}

export class CreateEmailNotificationDto extends BaseNotificationDto {
  @IsEnum(EmailProviderEnum)
  @IsOptional()
  keyEmailProvider?: EmailProviderEnum = EmailProviderEnum.MAILHOG;

  @IsEmail()
  senderEmail: string;

  @IsOptional()
  @IsString()
  senderName?: string;

  @IsEmail({}, { each: true })
  receiverEmails: string[];

  @ValidateNested()
  @Type(() => EmailPayloadDto)
  payload: EmailPayloadDto;

  @IsDate()
  @Transform((params) => (params.value ? dayjs(params.value).toDate() : null)) 
  sendAt: Nullable<Date>;
}
