/** @module Urlencoded */

import { HttpError } from './error';
import { parse } from 'querystring';
import getRawBody from 'raw-body';
import typer from 'media-typer';

/**
 * Parses urlencoded request's body
 *
 * @param {http.IncomingMessage} req - Request message
 * @param {Object} options
 */
export default async (req, { limit = '1mb' } = {}) => {
    const type = req.headers['content-type'];
    if (!/urlencoded/.test(type)) {
        return null;
    }
    try {
        const length = req.headers['content-length'],
            encoding = typer.parse(type).parameters.charset,
            string = await getRawBody(req, { limit, length, encoding });
        return parse(string.toString());
    } catch (err) {
        if (err.type === 'entity.too.large') {
            throw new HttpError(`Body exceeded ${limit} limit`, 413, 40013, err);
        } else {
            throw new HttpError('Invalid body', 400, 40001, err);
        }
    }
};
