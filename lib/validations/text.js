"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredWithTrim = exports.required = exports.pattern = exports.minLength = exports.maxLength = exports.equal = exports.different = void 0;
var factories_1 = require("../factories");
function different(comparisonValue) {
    return factories_1.trim(factories_1.optional(function (value) { return value !== comparisonValue; }));
}
exports.different = different;
function equal(comparisonValue) {
    return factories_1.trim(factories_1.optional(function (value) { return value === comparisonValue; }));
}
exports.equal = equal;
function maxLength(length) {
    return factories_1.trim(factories_1.optional(function (value) { return value.length <= length; }));
}
exports.maxLength = maxLength;
function minLength(length) {
    return factories_1.trim(factories_1.optional(function (value) { return value.length >= length; }));
}
exports.minLength = minLength;
function pattern(exp) {
    return factories_1.trim(factories_1.optional(function (value) { return exp.test(value); }));
}
exports.pattern = pattern;
function required(value) {
    return !!value;
}
exports.required = required;
exports.requiredWithTrim = factories_1.trim(function (value) {
    return required(value);
});
//# sourceMappingURL=text.js.map