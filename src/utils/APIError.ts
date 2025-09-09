class APIError extends Error {
	success = false;

	constructor(
		public statusCode: number,
		public message: string = "Something went wrong",
		public errors: unknown =  [],
		public data: any = [],
	) {
		super(message);
		// Capture stack trace at the point where an object is created from this class
		// if (!this.stack) {
		// 	Error.captureStackTrace(this, this.constructor);
		// }
	}
}

export default APIError;
