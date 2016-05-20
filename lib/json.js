/** @module Json */

import { HttpError } from './error';
import getRawBody from 'raw-body';
import typer from 'media-typer';

/**
 * Parses json request's body
 *
 * @param {http.IncomingMessage} req - Request message
 * @param {Object} options
 */
export default async (req, { limit = '1mb' } = {}) => {
    const type = req.headers['content-type'];
    if (!/json/.test(type)) {
        return null;
    }
    try {
        const length = req.headers['content-length'],
            encoding = typer.parse(type).parameters.charset,
            string = await getRawBody(req, { limit, length, encoding });
        try {
            return JSON.parse(string);
        } catch (err) {
            throw new HttpError('Invalid JSON string', 400, 40001, err);
        }
    } catch (err) {
        if (err.type === 'entity.too.large') {
            throw new HttpError(`Body exceeded ${limit} limit`, 413, 40013, err);
        } else {
            throw new HttpError('Invalid body', 400, 40001, err);
        }
    }
};
