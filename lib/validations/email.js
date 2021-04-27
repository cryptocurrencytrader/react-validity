"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var factories_1 = require("../factories");
var email = factories_1.trim(factories_1.optional(function (value) {
    return /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i.test(value);
}));
exports.default = email;
//# sourceMappingURL=email.js.map