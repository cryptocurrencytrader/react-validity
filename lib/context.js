"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var EventEmitter_1 = tslib_1.__importDefault(require("./EventEmitter"));
var Context = react_1.default.createContext({
    eventEmitter: new EventEmitter_1.default(),
});
Context.displayName = "ValidityContext";
exports.default = Context;
//# sourceMappingURL=context.js.map