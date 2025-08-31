import { Response, Request, NextFunction } from "express";
import logger from "../config/logger";
import APIError from "../utils/APIError";

const handleError = (
	err: APIError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errorResponse: APIError = {
		statusCode: err.statusCode || 500,
		success: err.success || false,
		message: err.message || "Something went wrong",
		data: err.data || [],
		errors: err.errors || [],
		name: err.name || "Server Error",
	};

	logger.error(`[SERVER] error `, errorResponse);
	res.status(errorResponse.statusCode).json(errorResponse);
};

export default handleError;
