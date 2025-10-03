import APIError from '@/utils/APIError.js';
import jwt from 'jsonwebtoken';
export var AccountType;
(function (AccountType) {
    AccountType["ADMIN"] = "admin";
    AccountType["USER"] = "user";
})(AccountType || (AccountType = {}));
const JWT_SECRET = process.env.JWT_SECRET;
export const signToken = (payload, expiresIn = '7d') => {
    try {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: expiresIn,
        });
    }
    catch (error) {
        throw new APIError(500, `[TOKEN_SERVICE] JWT Token creation failed`);
    }
};
export const generateTokens = (payload) => {
    const accessToken = signToken(payload, '1d');
    const refreshToken = signToken(payload, '7d');
    return {
        accessToken,
        refreshToken,
    };
};
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
//# sourceMappingURL=token.service.js.map