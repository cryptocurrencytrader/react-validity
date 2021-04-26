"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var moment_1 = tslib_1.__importDefault(require("moment"));
var factories_1 = require("../factories");
function date(format) {
    return factories_1.trim(factories_1.optional(function (value) { return moment_1.default(value, format, true).isValid(); }));
}
exports.default = date;
//# sourceMappingURL=date.js.map