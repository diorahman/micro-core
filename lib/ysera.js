/** @module Ysera*/
import { Server as server } from 'http';
import urlencoded from './urlencoded';
import { generate } from 'url-match';
import { parse } from 'url';
import boot from './serve';
import json from './json';

const DEV = process.env.NODE_ENV === 'development',
    CACHE = {};

/** Class representing Ysera */
export default class Ysera {
    /**
     * Serves
     *
     */
    static serve(fn, { onError = null } = {}) {
        return server((req, res) => {
            Ysera.run(req, res, fn, onError || Ysera.sendError);
        });
    }

    /**
     * Runs
     *
     */
    static async run(req, res, fn, onError) {
        try {
            const val = await fn(req, res);

            if (val !== null) {
                this.send(res, 200, val);
            }
        } catch (error) {
            await onError(req, res, error);
        }
    }

    /**
     * Sends.
     *
     */
    static send(res, code, object = null) {
        res.statusCode = code;
        if (object === null) {
            return res.end();
        }

        let string;
        if (typeof object === 'object') {
            // we stringify before setting the header
            // in case `JSON.stringify` throws and a
            // 500 has to be sent instead

            // the `JSON.stringify` call is split into
            // two cases as `JSON.stringify` is optimized
            // in V8 if called with only one argument
            string = DEV
                ? JSON.stringify(object, null, 2) : JSON.stringify(object);
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
    static sendError(req, res, { code, message, stack }) {
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
    static async parse(req, options = {}) {
        const { method, headers, url } = req,
            parsedUrl = parse(url, true),
            { path, pathname, query } = parsedUrl,
            { pattern } = options,
            parsed = {
                method,
                url,
                path,
                pathname,
                query
            };

        // if we have pattern to match, e.g. /hihi/:version/:id
        // and given /hihi/1/haha, then we should get
        // { version: 1, id: 'haha' } as the params object.
        if (pattern) {
            const compiled = CACHE[pattern] || (CACHE[pattern] = generate(pattern)),
                matched = compiled.match(parsed.path);
            parsed.query = matched.queryParams;
            parsed.params = matched.namedParams;
        }

        parsed.headers = {};
        for (let key in headers) {
            parsed.headers[key.toLowerCase()] = headers[key];
        }

        if ([ 'POST', 'PUT' ].indexOf(method) >= 0) {
            parsed.body = await urlencoded(req, options) || await json(req, options) || {};
        }

        return parsed;
    }

    static boot(fn, port = 3000) {
        boot(fn, port);
    }
}
