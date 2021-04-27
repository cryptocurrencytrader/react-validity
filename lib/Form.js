"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var context_1 = tslib_1.__importDefault(require("./context"));
var EventEmitter_1 = tslib_1.__importDefault(require("./EventEmitter"));
var Form = /** @class */ (function (_super) {
    tslib_1.__extends(Form, _super);
    function Form() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.providerValue = {
            eventEmitter: new EventEmitter_1.default(),
        };
        _this.formElementRef = react_1.default.createRef();
        _this.submitHandler = function (event) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            event.preventDefault();
            if (_this.validate() && _this.props.onSubmit) {
                (_a = _this.props).onSubmit.apply(_a, tslib_1.__spreadArray([event], tslib_1.__read(args)));
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
        var _a = tslib_1.__assign({}, this.props), _b = _a.noValidate, noValidate = _b === void 0 ? true : _b, props = tslib_1.__rest(_a, ["noValidate"]);
        return (react_1.default.createElement(context_1.default.Provider, { value: this.providerValue },
            react_1.default.createElement("form", tslib_1.__assign({}, props, { noValidate: noValidate, onSubmit: this.submitHandler, ref: this.formElementRef }))));
    };
    return Form;
}(react_1.default.Component));
exports.default = Form;
//# sourceMappingURL=Form.js.map