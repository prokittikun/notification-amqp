export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ObjectValue<T = unknown> = Record<string, T>;
export type GenericID = string | number | null | undefined;