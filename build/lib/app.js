var Reflect = require('reflect-r');var regeneratorRuntime = require('babel-regenerator-runtime');'use strict';

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

var _serve = require('../lib/serve');

var _serve2 = _interopRequireDefault(_serve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var send = _lib2.default.send;
var fn = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        send(res, 200, 'OK');

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function fn(_x, _x2) {
        return ref.apply(this, arguments);
    };
}();

(0, _serve2.default)(fn, 3000);
//# sourceMappingURL=app.js.map
