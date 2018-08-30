import { formattedStrToNumber, optional, trim } from "../factories";

export function greaterThan(comparisonValue: number, locale: string) {
  return trim(optional(formattedStrToNumber(locale)((value) => value > comparisonValue)));
}

export function greaterThanOrEqual(comparisonValue: number, locale: string) {
  return trim(optional(formattedStrToNumber(locale)((value) => value >= comparisonValue)));
}

export function lessThan(comparisonValue: number, locale: string) {
  return trim(optional(formattedStrToNumber(locale)((value) => value < comparisonValue)));
}

export function lessThanOrEqual(comparisonValue: number, locale: string) {
  return trim(optional(formattedStrToNumber(locale)((value) => value <= comparisonValue)));
}
