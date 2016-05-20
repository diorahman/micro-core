var Reflect = require('reflect-r');var regeneratorRuntime = require('babel-regenerator-runtime');'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _error = require('./error');

var _rawBody = require('raw-body');

var _rawBody2 = _interopRequireDefault(_rawBody);

var _mediaTyper = require('media-typer');

var _mediaTyper2 = _interopRequireDefault(_mediaTyper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /** @module Json */

/**
 * Parses json request's body
 *
 * @param {http.IncomingMessage} req - Request message
 * @param {Object} options
 */

exports.default = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req) {
        var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var _ref$limit = _ref.limit;
        var limit = _ref$limit === undefined ? '1mb' : _ref$limit;
        var type, length, encoding, string;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        type = req.headers['content-type'];

                        if (/json/.test(type)) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt('return', null);

                    case 3:
                        _context.prev = 3;
                        length = req.headers['content-length'];
                        encoding = _mediaTyper2.default.parse(type).parameters.charset;
                        _context.next = 8;
                        return (0, _rawBody2.default)(req, { limit: limit, length: length, encoding: encoding });

                    case 8:
                        string = _context.sent;
                        _context.prev = 9;
                        return _context.abrupt('return', JSON.parse(string));

                    case 13:
                        _context.prev = 13;
                        _context.t0 = _context['catch'](9);
                        throw new _error.HttpError('Invalid JSON string', 400, 40001, _context.t0);

                    case 16:
                        _context.next = 25;
                        break;

                    case 18:
                        _context.prev = 18;
                        _context.t1 = _context['catch'](3);

                        if (!(_context.t1.type === 'entity.too.large')) {
                            _context.next = 24;
                            break;
                        }

                        throw new _error.HttpError('Body exceeded ' + limit + ' limit', 413, 40013, _context.t1);

                    case 24:
                        throw new _error.HttpError('Invalid body', 400, 40001, _context.t1);

                    case 25:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[3, 18], [9, 13]]);
    }));

    return function (_x, _x2) {
        return ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=json.js.map
