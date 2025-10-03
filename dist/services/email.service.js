import nodemailer, {} from "nodemailer";
import {} from "../@types/email.d.js";
import APIError from "../utils/APIError.js";
import logger from "@/config/logger.js";
class MainService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        this.transporter
            .verify()
            .then(() => {
            logger.info("[EMAIL] connected to service");
        })
            .catch((err) => {
            logger.error(`[EMAIL] Service :  ${err}`);
        });
    }
    async sendEmail(option) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: option.to,
                subject: option.subject,
                text: option.text,
                html: option.html,
            };
            try {
                await this.transporter.sendMail(mailOptions);
                logger.debug("mail successfully sent");
            }
            catch (error) {
                throw new APIError(500, error.message);
            }
        }
        catch (error) { }
    }
}
export default new MainService();
//# sourceMappingURL=email.service.js.map