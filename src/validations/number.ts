import { optional, trim } from "../factories";

export function greaterThan(comparisonValue: number) {
  return trim(optional((value) => +value > comparisonValue));
}

export function greaterThanOrEqual(comparisonValue: number) {
  return trim(optional((value) => +value >= comparisonValue));
}

export function lessThan(comparisonValue: number) {
  return trim(optional((value) => +value < comparisonValue));
}

export function lessThanOrEqual(comparisonValue: number) {
  return trim(optional((value) => +value <= comparisonValue));
}
