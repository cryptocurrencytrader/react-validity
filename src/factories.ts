export type ValidationFn = (value: string) => boolean;

export function optional(fn: ValidationFn) {
  return (value: string) => !value ? true : fn(value);
}

export function trim(fn: ValidationFn) {
  return (value: string) => fn(value.trim());
}
