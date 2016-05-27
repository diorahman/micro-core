/** @module Index */
import { install } from 'source-map-support'; install();

import Ysera from './ysera';
import { YseraError, HttpError } from './error.js';

const { send, sendError, parseMeta, parseBody, parse, boot } = Ysera;

// Exposes main entrypoint to the lib.
export default Ysera;

export { send, sendError, parseMeta, parseBody, parse, boot };

// Exposes the lib error.
export { YseraError, HttpError };
