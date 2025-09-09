import logger from "@/config/logger.js";
import APIError from "@/utils/APIError.js";
const handleError = (err, _req, res, _next) => {
    const errorResponse = {
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
//# sourceMappingURL=handleError.middleware.js.map