var Reflect = require('reflect-r');var regeneratorRuntime = require('babel-regenerator-runtime');'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YseraError = undefined;

var _sourceMapSupport = require('source-map-support');

var _ysera = require('./ysera');

var _ysera2 = _interopRequireDefault(_ysera);

var _error = require('./error.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _sourceMapSupport.install)(); /** @module Index */


// Exposes main entrypoint to the lib.
exports.default = _ysera2.default;

// Exposes the lib error.

exports.YseraError = _error.YseraError;
//# sourceMappingURL=index.js.map
