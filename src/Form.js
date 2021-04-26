"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var react_1 = require("react");
var context_1 = require("./context");
var EventEmitter_1 = require("./EventEmitter");
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.providerValue = {
            eventEmitter: new EventEmitter_1["default"]()
        };
        _this.formElementRef = react_1["default"].createRef();
        _this.submitHandler = function (event) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            event.preventDefault();
            if (_this.validate() && _this.props.onSubmit) {
                (_a = _this.props).onSubmit.apply(_a, __spreadArray([event], args));
            }
        };
        return _this;
    }
    Form.prototype.pristineIt = function () {
        this.providerValue.eventEmitter.emit("pristine");
    };
    Form.prototype.validate = function () {
        this.providerValue.eventEmitter.emit("validate");
        return this.formElementRef.current.checkValidity();
    };
    Form.prototype.render = function () {
        var _a = __assign({}, this.props), _b = _a.noValidate, noValidate = _b === void 0 ? true : _b, props = __rest(_a, ["noValidate"]);
        return (<context_1["default"].Provider value={this.providerValue}>
        <form {...props} noValidate={noValidate} onSubmit={this.submitHandler} ref={this.formElementRef}/>
      </context_1["default"].Provider>);
    };
    return Form;
}(react_1["default"].Component));
exports["default"] = Form;
