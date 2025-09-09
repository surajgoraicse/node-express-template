import { RegisterSchema } from "@/@types/interface.js";
import { hashPassword } from "@/tools/encryption.js";
import APIError from "@/utils/APIError.js";
import catchAsync from "@/utils/async.handler.js";
import { redis } from "@/config/database.js";
import {} from "express";
import logger from "@/config/logger.js";
import { generateOtp } from "@/services/otp.service.js";
import emailService from "@/services/email.service.js";
import APIResponse from "@/utils/APIResponse.js";
export const initRegister = catchAsync(async (req, res) => {
    const { email, password, fullName } = req.body;
    const validateData = RegisterSchema.safeParse({
        email,
        password,
        fullName,
    });
    if (!validateData.success) {
        throw new APIError(400, "Register Data validation failed", validateData.error?.format());
    }
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
        throw new APIError(400, "User Email already exists");
    }
    const hashedPassword = await hashPassword(password);
    await redis.setValue(`register:${email}`, JSON.stringify({
        email,
        fullName,
        password: hashedPassword,
    }), 60 * 5);
    const otp = await generateOtp(email);
    await emailService.sendEmail({
        to: email,
        subject: "Your OTP code ",
        text: `Your OTP code is ${otp}. It is valid for 5 minutes`,
    });
    logger.debug("otp : ", otp);
    res.status(200).json(new APIResponse(200, "OTP sent to your Email for Verification", {
        otp: otp,
    }));
});
//# sourceMappingURL=user.controller.js.map