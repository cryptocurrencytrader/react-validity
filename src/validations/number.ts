import { optional, removeNumberFormat, trim } from "../factories";

export function greaterThan(comparisonValue: number, locale: string) {
  return trim(optional(removeNumberFormat((value) => +value > comparisonValue, locale)));
}

export function greaterThanOrEqual(comparisonValue: number, locale: string) {
  return trim(optional(removeNumberFormat((value) => +value >= comparisonValue, locale)));
}

export function lessThan(comparisonValue: number, locale: string) {
  return trim(optional(removeNumberFormat((value) => +value < comparisonValue, locale)));
}

export function lessThanOrEqual(comparisonValue: number, locale: string) {
  return trim(optional(removeNumberFormat((value) => +value <= comparisonValue, locale)));
}
