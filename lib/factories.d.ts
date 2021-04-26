export declare type ValidationFn = (value: string) => boolean;
export declare type ValidationNumericFn = (value: number) => boolean;
export declare function optional(fn: ValidationFn): (value: string) => boolean;
export declare function trim(fn: ValidationFn): (value: string) => boolean;
export declare function formattedStrToNumber(locale: string): (fn: ValidationNumericFn) => (value: string) => boolean;
