var Reflect = require('reflect-r');var regeneratorRuntime = require('babel-regenerator-runtime');'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpError = exports.YseraError = exports.boot = exports.parse = exports.parseBody = exports.parseMeta = exports.sendError = exports.send = undefined;

var _sourceMapSupport = require('source-map-support');

var _ysera = require('./ysera');

var _ysera2 = _interopRequireDefault(_ysera);

var _error = require('./error.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _sourceMapSupport.install)(); /** @module Index */


var send = _ysera2.default.send;
var sendError = _ysera2.default.sendError;
var parseMeta = _ysera2.default.parseMeta;
var parseBody = _ysera2.default.parseBody;
var parse = _ysera2.default.parse;
var boot = _ysera2.default.boot;

// Exposes main entrypoint to the lib.

exports.default = _ysera2.default;
exports.send = send;
exports.sendError = sendError;
exports.parseMeta = parseMeta;
exports.parseBody = parseBody;
exports.parse = parse;
exports.boot = boot;

// Exposes the lib error.

exports.YseraError = _error.YseraError;
exports.HttpError = _error.HttpError;
//# sourceMappingURL=index.js.map
