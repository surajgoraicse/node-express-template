class APIResponse {
    statusCode;
    message;
    data;
    success = true;
    constructor(statusCode, message, data = []) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
export default APIResponse;
//# sourceMappingURL=APIResponse.js.map