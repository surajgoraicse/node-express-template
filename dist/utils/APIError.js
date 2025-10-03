class APIError extends Error {
    statusCode;
    message;
    errors;
    data;
    success = false;
    constructor(statusCode, message = "Something went wrong", errors = [], data = []) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.data = data;
        // Capture stack trace at the point where an object is created from this class
        // if (!this.stack) {
        // 	Error.captureStackTrace(this, this.constructor);
        // }
    }
}
export default APIError;
//# sourceMappingURL=APIError.js.map