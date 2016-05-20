var Reflect = require('reflect-r');var regeneratorRuntime = require('babel-regenerator-runtime');'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ysera = require('./ysera');

var _ysera2 = _interopRequireDefault(_ysera);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn, port) {
    _ysera2.default.serve(fn).listen(port, function (error) {
        if (error) {
            throw error;
        }
        console.log('> \u001b[96mYsera!\u001b[39m Listening on ' + port + '.');
    });
}; /* eslint-disable no-console */
//# sourceMappingURL=serve.js.map
