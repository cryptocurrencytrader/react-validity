"use strict";
exports.__esModule = true;
exports.formattedStrToNumber = exports.trim = exports.optional = void 0;
function optional(fn) {
    return function (value) { return !value ? true : fn(value); };
}
exports.optional = optional;
function trim(fn) {
    return function (value) { return fn(value.trim()); };
}
exports.trim = trim;
function formattedStrToNumber(locale) {
    return function (fn) {
        return function (value) {
            var formattedNumber = new Intl.NumberFormat(locale, {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1
            })
                .format(0);
            var decimalSeparatorChar = formattedNumber.replace(/\d/g, "");
            var parsedValue = +value
                .replace(new RegExp("[^\\d" + decimalSeparatorChar + "]", "g"), "")
                .replace(decimalSeparatorChar, ".");
            return fn(parsedValue);
        };
    };
}
exports.formattedStrToNumber = formattedStrToNumber;
