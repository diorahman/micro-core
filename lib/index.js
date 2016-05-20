/** @module Index */
import { install } from 'source-map-support'; install();

import Ysera from './ysera';
import { YseraError } from './error.js';

// Exposes main entrypoint to the lib.
export default Ysera;

// Exposes the lib error.
export { YseraError };
