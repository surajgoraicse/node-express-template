import type { Response, Request, NextFunction } from "express";
import logger from "@/config/logger.js";
import APIError from "@/utils/APIError.js";

const handleError = (
	err: APIError, // check if this type will break in case of system error.
	_req: Request,
	res: Response,
	_next: NextFunction
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
