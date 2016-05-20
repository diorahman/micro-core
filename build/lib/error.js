var Reflect = require('reflect-r');var regeneratorRuntime = require('babel-regenerator-runtime');'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
    function ExtendableBuiltin() {
        var instance = Reflect.construct(cls, Array.from(arguments));
        Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
        return instance;
    }

    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
        constructor: {
            value: cls,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });

    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ExtendableBuiltin, cls);
    } else {
        ExtendableBuiltin.__proto__ = cls;
    }

    return ExtendableBuiltin;
}

/** The base extensible error class */

var BaseError = function (_extendableBuiltin2) {
    _inherits(BaseError, _extendableBuiltin2);

    function BaseError(message) {
        _classCallCheck(this, BaseError);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseError).call(this, message));

        _this.name = _this.constructor.name;
        return _this;
    }

    return BaseError;
}(_extendableBuiltin(Error));

/** Wraps Ysera errors */


var YseraError = function (_BaseError) {
    _inherits(YseraError, _BaseError);

    function YseraError(message, code) {
        var source = arguments.length <= 2 || arguments[2] === undefined ? 'Ysera' : arguments[2];

        _classCallCheck(this, YseraError);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(YseraError).call(this, message + ' (' + code + ' of ' + source + ')'));
        // Hence we know which place is failing by just reading the message


        _this2.code = code;
        _this2.source = source;
        _this2.name = _this2.constructor.name;
        return _this2;
    }

    return YseraError;
}(BaseError);

/** Wraps Http errors */


var HttpError = function (_BaseError2) {
    _inherits(HttpError, _BaseError2);

    function HttpError(message, code) {
        var internal = arguments.length <= 2 || arguments[2] === undefined ? 50001 : arguments[2];
        var originalError = arguments[3];

        _classCallCheck(this, HttpError);

        if (originalError instanceof YseraError) {
            internal = originalError.code;
        }

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(HttpError).call(this, message + ' (' + internal + ')'));

        _this3.code = code;
        _this3.internal = internal;
        _this3.originalError = originalError;
        _this3.name = _this3.constructor.name;
        return _this3;
    }

    return HttpError;
}(BaseError);

exports.YseraError = YseraError;
exports.HttpError = HttpError;
//# sourceMappingURL=error.js.map
