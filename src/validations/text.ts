import { optional, trim } from "../factories";

export function different(comparisonValue: string) {
  return trim(optional((value) => value !== comparisonValue));
}

export function equal(comparisonValue: string) {
  return trim(optional((value) => value === comparisonValue));
}

export function maxLength(length: number) {
  return trim(optional((value) => value.length <= length));
}

export function minLength(length: number) {
  return trim(optional((value) => value.length >= length));
}

export function pattern(exp: RegExp) {
  return trim(optional((value) => exp.test(value)));
}

export function required(value: string): boolean {
  return !!value;
}

export const requiredWithTrim = trim((value) => {
  return required(value);
});
