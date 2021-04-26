"use strict";
exports.__esModule = true;
var react_1 = require("react");
var EventEmitter_1 = require("./EventEmitter");
var Context = react_1["default"].createContext({
    eventEmitter: new EventEmitter_1["default"]()
});
Context.displayName = "ValidityContext";
exports["default"] = Context;
