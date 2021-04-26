"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessThanOrEqual = exports.lessThan = exports.greaterThanOrEqual = exports.greaterThan = void 0;
var factories_1 = require("../factories");
function greaterThan(comparisonValue, locale) {
    return factories_1.trim(factories_1.optional(factories_1.formattedStrToNumber(locale)(function (value) { return value > comparisonValue; })));
}
exports.greaterThan = greaterThan;
function greaterThanOrEqual(comparisonValue, locale) {
    return factories_1.trim(factories_1.optional(factories_1.formattedStrToNumber(locale)(function (value) { return value >= comparisonValue; })));
}
exports.greaterThanOrEqual = greaterThanOrEqual;
function lessThan(comparisonValue, locale) {
    return factories_1.trim(factories_1.optional(factories_1.formattedStrToNumber(locale)(function (value) { return value < comparisonValue; })));
}
exports.lessThan = lessThan;
function lessThanOrEqual(comparisonValue, locale) {
    return factories_1.trim(factories_1.optional(factories_1.formattedStrToNumber(locale)(function (value) { return value <= comparisonValue; })));
}
exports.lessThanOrEqual = lessThanOrEqual;
//# sourceMappingURL=number.js.map