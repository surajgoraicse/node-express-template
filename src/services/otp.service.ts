import logger from "../config/logger.js";
import APIError from "../utils/APIError.js";

function generateCode(): string {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function generateOtp(email: string): Promise<string> {
	try {
		const otp = generateCode();
		await redis.setValue(`otp:${email}`, otp, 60 * 5);
		logger.debug(`[OTP SERVICE] otp store in redis`);
		return otp;
	} catch (error) {
		throw new APIError(400, "Failed to save otp in redis");
	}
}
