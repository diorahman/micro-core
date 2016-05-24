/** The base extensible error class */
class BaseError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

/** Wraps Ysera errors */
class YseraError extends BaseError {
    constructor(message, code, source = 'Ysera') {
        // Hence we know which place is failing by just reading the message
        super(`${message} (${code} of ${source})`);
        this.code = code;
        this.source = source;
        this.name = this.constructor.name;
    }
}

/** Wraps Http errors */
class HttpError extends BaseError {
    constructor(message, code, originalError, internal = 50001) {
        if (originalError instanceof YseraError) {
            internal = originalError.code;
        }
        super(`${message} (${internal})`);
        this.code = code;
        this.internal = originalError.code || originalError.internal || internal;
        this.originalError = originalError;
        this.name = this.constructor.name;
    }
}

export { YseraError, HttpError };
