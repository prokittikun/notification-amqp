import { Transform } from "class-transformer";
import dayjs from "dayjs";
import { IsDate, IsOptional, IsString } from "class-validator";

export abstract class BaseNotificationDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsDate()
  @IsOptional()
  @Transform((params) => (params.value ? dayjs(params.value).toDate() : null))
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  @Transform((params) => (params.value ? dayjs(params.value).toDate() : null))
  updatedAt?: Date;
}