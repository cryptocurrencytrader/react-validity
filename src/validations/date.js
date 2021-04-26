"use strict";
exports.__esModule = true;
var moment_1 = require("moment");
var factories_1 = require("../factories");
function date(format) {
    return factories_1.trim(factories_1.optional(function (value) { return moment_1["default"](value, format, true).isValid(); }));
}
exports["default"] = date;
