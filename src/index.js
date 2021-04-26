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
exports.__esModule = true;
exports.Provider = exports.EventEmitter = void 0;
var hoist_non_react_statics_1 = require("hoist-non-react-statics");
var react_1 = require("react");
var react_display_name_1 = require("react-display-name");
var react_dom_1 = require("react-dom");
var context_1 = require("./context");
var EventEmitter_1 = require("./EventEmitter");
exports.EventEmitter = EventEmitter_1["default"];
var Provider = context_1["default"].Provider;
exports.Provider = Provider;
function withValidity(WrappedComponent, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.subscribe, subscribe = _c === void 0 ? true : _c;
    var Validity = /** @class */ (function (_super) {
        __extends(Validity, _super);
        function Validity() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.element = null;
            _this.triggerComponentValidity = function (actionName, message) {
                if (message === void 0) { message = ""; }
                var preventDefaultFn = function (value) {
                    message = value;
                };
                var validationValue = [!message, message];
                var event = {
                    preventDefault: preventDefaultFn,
                    value: validationValue
                };
                _this.state.validity.eventEmitter.emit(actionName, event);
                _this.element.setCustomValidity(message);
                var valid = !message;
                _this.setState({
                    validity: __assign(__assign({}, _this.state.validity), { message: message,
                        valid: valid })
                });
                return valid;
            };
            _this.pristineIt = function () {
                _this.triggerComponentValidity("pristine");
            };
            _this.validate = function () {
                var validations = _this.props.validations;
                var validationMessage = "";
                for (var _i = 0, _a = validations || []; _i < _a.length; _i++) {
                    var _b = _a[_i], message = _b[0], validateFn = _b[1];
                    var element = _this.element;
                    var value = element.value;
                    if (element.tagName.toLowerCase() === "input" &&
                        element.type === "file" &&
                        element.dataset.hasOwnProperty("validityValue")) {
                        value = element.dataset.validityValue;
                    }
                    if (validateFn.call(element, value)) {
                        continue;
                    }
                    validationMessage = message;
                    break;
                }
                return _this.triggerComponentValidity("validate", validationMessage);
            };
            _this.pristineHandler = function () {
                _this.pristineIt();
            };
            _this.validateHandler = function () {
                _this.validate();
            };
            _this.state = {
                validity: {
                    eventEmitter: new EventEmitter_1["default"](),
                    message: "",
                    pristineIt: _this.pristineIt,
                    valid: true,
                    validate: _this.validate
                }
            };
            return _this;
        }
        Validity.prototype.componentDidMount = function () {
            var node = react_dom_1.findDOMNode(this);
            if (node instanceof Element) {
                this.element = node.querySelector("input, textarea, select");
            }
            if (!this.element) {
                throw new Error('No "input", "textarea" or "select" element was found under react-validity children tree');
            }
            var formEmitter = this.context.eventEmitter;
            if (subscribe ||
                (Array.isArray(subscribe) && subscribe.includes("pristine"))) {
                formEmitter.on("pristine", this.pristineHandler);
            }
            if (subscribe ||
                (Array.isArray(subscribe) && subscribe.includes("validate"))) {
                formEmitter.on("validate", this.validateHandler);
            }
        };
        Validity.prototype.componentWillUnmount = function () {
            var formEmitter = this.context.eventEmitter;
            if (subscribe ||
                (Array.isArray(subscribe) && subscribe.includes("pristine"))) {
                formEmitter.off("pristine", this.pristineIt);
            }
            if (subscribe ||
                (Array.isArray(subscribe) && subscribe.includes("validate"))) {
                formEmitter.off("validate", this.validate);
            }
        };
        Validity.prototype.render = function () {
            var _a = this.props, _ = _a.validityContext, props = __rest(_a, ["validityContext"]);
            var validityProps = __assign(__assign({}, this.state), { validations: this.props.validations });
            return <WrappedComponent {...props} {...validityProps}/>;
        };
        Validity.displayName = "InjectedValidity(" + react_display_name_1["default"](WrappedComponent) + ")";
        Validity.contextType = context_1["default"];
        return Validity;
    }(react_1["default"].Component));
    hoist_non_react_statics_1["default"](Validity, WrappedComponent);
    return Validity;
}
function validityWithConsumer(config) {
    return function (WrappedComponent) {
        return withValidity(WrappedComponent, config);
    };
}
exports["default"] = validityWithConsumer;
