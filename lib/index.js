"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.EventEmitter = void 0;
var tslib_1 = require("tslib");
var hoist_non_react_statics_1 = tslib_1.__importDefault(require("hoist-non-react-statics"));
var react_1 = tslib_1.__importDefault(require("react"));
var react_display_name_1 = tslib_1.__importDefault(require("react-display-name"));
var react_dom_1 = require("react-dom");
var context_1 = tslib_1.__importDefault(require("./context"));
var EventEmitter_1 = tslib_1.__importDefault(require("./EventEmitter"));
exports.EventEmitter = EventEmitter_1.default;
var Provider = context_1.default.Provider;
exports.Provider = Provider;
function withValidity(WrappedComponent, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.subscribe, subscribe = _c === void 0 ? true : _c;
    var Validity = /** @class */ (function (_super) {
        tslib_1.__extends(Validity, _super);
        function Validity() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(args))) || this;
            _this.element = null;
            _this.triggerComponentValidity = function (actionName, message) {
                if (message === void 0) { message = ""; }
                var preventDefaultFn = function (value) {
                    message = value;
                };
                var validationValue = [!message, message];
                var event = {
                    preventDefault: preventDefaultFn,
                    value: validationValue,
                };
                _this.state.validity.eventEmitter.emit(actionName, event);
                _this.element.setCustomValidity(message);
                var valid = !message;
                _this.setState({
                    validity: tslib_1.__assign(tslib_1.__assign({}, _this.state.validity), { message: message,
                        valid: valid }),
                });
                return valid;
            };
            _this.pristineIt = function () {
                _this.triggerComponentValidity("pristine");
            };
            _this.validate = function () {
                var e_1, _a;
                var validations = _this.props.validations;
                var validationMessage = "";
                try {
                    for (var _b = tslib_1.__values(validations || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = tslib_1.__read(_c.value, 2), message = _d[0], validateFn = _d[1];
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
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
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
                    eventEmitter: new EventEmitter_1.default(),
                    message: "",
                    pristineIt: _this.pristineIt,
                    valid: true,
                    validate: _this.validate,
                },
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
            var _a = this.props, _ = _a.validityContext, props = tslib_1.__rest(_a, ["validityContext"]);
            var validityProps = tslib_1.__assign(tslib_1.__assign({}, this.state), { validations: this.props.validations });
            return react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, props, validityProps));
        };
        Validity.displayName = "InjectedValidity(" + react_display_name_1.default(WrappedComponent) + ")";
        Validity.contextType = context_1.default;
        return Validity;
    }(react_1.default.Component));
    hoist_non_react_statics_1.default(Validity, WrappedComponent);
    return Validity;
}
function validityWithConsumer(config) {
    return function (WrappedComponent) {
        return withValidity(WrappedComponent, config);
    };
}
exports.default = validityWithConsumer;
//# sourceMappingURL=index.js.map