import path from "path";
import winston from "winston";
const { combine, timestamp, printf, colorize, align } = winston.format;
const consoleFormat = combine(colorize({ all: true }), timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS" }), align(), printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`));
const fileFormat = combine(timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS" }), printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`));
const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    transports: [
        new winston.transports.Console({ format: consoleFormat }),
        new winston.transports.File({
            filename: path.join("log", "error.log"),
            level: "error",
            format: fileFormat,
        }),
        new winston.transports.File({
            filename: path.join("log", "combined.log"),
            format: fileFormat,
        }),
    ],
});
export default logger;
//# sourceMappingURL=logger.js.map