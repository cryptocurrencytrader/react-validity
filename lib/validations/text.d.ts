export declare function different(comparisonValue: string): (value: string) => boolean;
export declare function equal(comparisonValue: string): (value: string) => boolean;
export declare function maxLength(length: number): (value: string) => boolean;
export declare function minLength(length: number): (value: string) => boolean;
export declare function pattern(exp: RegExp): (value: string) => boolean;
export declare function required(value: string): boolean;
export declare const requiredWithTrim: (value: string) => boolean;
