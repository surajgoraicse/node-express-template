class APIResponse {
	constructor(
		public statusCode: number,
		public success: boolean,
		public message: string,
		public data: unknown = []
	) {}
}

export default APIResponse;
