export type ValidationFn = (value: string) => boolean;

export function optional(fn: ValidationFn) {
  return (value: string) => !value ? true : fn(value);
}

export function trim(fn: ValidationFn) {
  return (value: string) => fn(value.trim());
}

export function removeNumberFormat(fn: ValidationFn, locale: string) {
  return (value: string) => {
    const formattedNumber = new Intl.NumberFormat(
        locale,
        {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
        },
      )
      .format(0);

    const decimalSeparatorChar = formattedNumber.replace(/\d/g, "");

    const parsedValue = value
      .replace(new RegExp(`[^\\d${decimalSeparatorChar}]`, "g"), "")
      .replace(decimalSeparatorChar, ".");

    return fn(parsedValue);
  };
}
