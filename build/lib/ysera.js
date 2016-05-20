var Reflect = require('reflect-r');var regeneratorRuntime = require('babel-regenerator-runtime');'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** @module Ysera*/


var _http = require('http');

var _urlencoded = require('./urlencoded');

var _urlencoded2 = _interopRequireDefault(_urlencoded);

var _urlMatch = require('url-match');

var _url = require('url');

var _serve = require('./serve');

var _serve2 = _interopRequireDefault(_serve);

var _json = require('./json');

var _json2 = _interopRequireDefault(_json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEV = process.env.NODE_ENV === 'development',
    CACHE = {};

/** Class representing Ysera */

var Ysera = function () {
    function Ysera() {
        _classCallCheck(this, Ysera);
    }

    _createClass(Ysera, null, [{
        key: 'serve',

        /**
         * Serves
         *
         */
        value: function serve(fn) {
            var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var _ref$onError = _ref.onError;
            var onError = _ref$onError === undefined ? null : _ref$onError;

            return (0, _http.Server)(function (req, res) {
                Ysera.run(req, res, fn, onError || Ysera.sendError);
            });
        }

        /**
         * Runs
         *
         */

    }, {
        key: 'run',
        value: function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, fn, onError) {
                var val;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return fn(req, res);

                            case 3:
                                val = _context.sent;


                                if (val !== null) {
                                    this.send(res, 200, val);
                                }
                                _context.next = 11;
                                break;

                            case 7:
                                _context.prev = 7;
                                _context.t0 = _context['catch'](0);
                                _context.next = 11;
                                return onError(req, res, _context.t0);

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 7]]);
            }));

            function run(_x2, _x3, _x4, _x5) {
                return ref.apply(this, arguments);
            }

            return run;
        }()

        /**
         * Sends.
         *
         */

    }, {
        key: 'send',
        value: function send(res, code) {
            var object = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            res.statusCode = code;
            if (object === null) {
                return res.end();
            }

            var string = void 0;
            if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') {
                // we stringify before setting the header
                // in case `JSON.stringify` throws and a
                // 500 has to be sent instead

                // the `JSON.stringify` call is split into
                // two cases as `JSON.stringify` is optimized
                // in V8 if called with only one argument
                string = DEV ? JSON.stringify(object, null, 2) : JSON.stringify(object);
                res.setHeader('Content-Type', 'application/json');
            } else {
                string = object;
            }

            // set content length
            res.setHeader('Content-Length', Buffer.byteLength(string));
            res.end(string);
        }

        /**
         * Sends error.
         *
         * @param {http.IncomingMessage} req
         * @param {http.OutgoingMessage} res
         */

    }, {
        key: 'sendError',
        value: function sendError(req, res, _ref2) {
            var code = _ref2.code;
            var message = _ref2.message;
            var stack = _ref2.stack;

            if (code) {
                this.send(res, code, DEV ? stack : message);
            } else {
                this.send(res, 500, DEV ? stack : 'Internal Server Error');
            }
            // FIXME: log the error
            return stack;
        }

        /**
         * Parses the request.
         *
         * @param {http.IncomingRequest} req
         * @param {Object} options
         */

    }, {
        key: 'parse',
        value: function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req) {
                var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var method, headers, url, parsedUrl, path, pathname, query, pattern, parsed, compiled, matched, key, body;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                method = req.method;
                                headers = req.headers;
                                url = req.url;
                                parsedUrl = (0, _url.parse)(url, true);
                                path = parsedUrl.path;
                                pathname = parsedUrl.pathname;
                                query = parsedUrl.query;
                                pattern = options.pattern;
                                parsed = {
                                    method: method,
                                    url: url,
                                    path: path,
                                    pathname: pathname,
                                    query: query
                                };

                                // if we have pattern to match, e.g. /hihi/:version/:id

                                if (pattern) {
                                    compiled = CACHE[pattern] || (CACHE[pattern] = (0, _urlMatch.generate)(pattern)), matched = compiled.match(parsed.path);

                                    parsed.query = matched.queryParams;
                                    parsed.params = matched.namedParams;
                                }

                                parsed.headers = {};
                                for (key in headers) {
                                    parsed.headers[key.toLowerCase()] = headers[key];
                                }

                                if (!(['POST', 'PUT'].indexOf(method) >= 0)) {
                                    _context2.next = 25;
                                    break;
                                }

                                _context2.next = 15;
                                return (0, _urlencoded2.default)(req, options);

                            case 15:
                                _context2.t1 = _context2.sent;

                                if (_context2.t1) {
                                    _context2.next = 20;
                                    break;
                                }

                                _context2.next = 19;
                                return (0, _json2.default)(req, options);

                            case 19:
                                _context2.t1 = _context2.sent;

                            case 20:
                                _context2.t0 = _context2.t1;

                                if (_context2.t0) {
                                    _context2.next = 23;
                                    break;
                                }

                                _context2.t0 = {};

                            case 23:
                                body = _context2.t0;

                                parsed.body = body;

                            case 25:
                                return _context2.abrupt('return', parsed);

                            case 26:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function parse(_x7, _x8) {
                return ref.apply(this, arguments);
            }

            return parse;
        }()
    }, {
        key: 'boot',
        value: function boot(fn) {
            var port = arguments.length <= 1 || arguments[1] === undefined ? 3000 : arguments[1];

            (0, _serve2.default)(fn, port);
        }
    }]);

    return Ysera;
}();

exports.default = Ysera;
//# sourceMappingURL=ysera.js.map
