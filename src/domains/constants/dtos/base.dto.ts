import { instanceToPlain } from "class-transformer";

export class BaseDto<T> {
  toJson() {
    return instanceToPlain(this) as T;
  }
}
