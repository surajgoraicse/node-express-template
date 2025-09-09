class APIResponse {
	success = true;
	constructor(
		public statusCode: number,
		public message: string,
		public data: unknown = []
	) {}
}

export default APIResponse;
