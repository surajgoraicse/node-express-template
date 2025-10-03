import nodemailer, { type Transporter } from "nodemailer";
import {type EmailInterface } from "../@types/email.d.js";
import APIError from "../utils/APIError.js";
import logger from "@/config/logger.js";



class MainService {
	transporter: Transporter;
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

	public async sendEmail(option: EmailInterface): Promise<void> {
		try {
			const mailOptions = {
				from: process.env.EMAIL_USER as string,
				to: option.to,
				subject: option.subject,
				text: option.text,
				html: option.html,
			};
			try {
				await this.transporter.sendMail(mailOptions);
				console.log("hello");
				logger.debug("mail successfully sent");
			} catch (error: any) {
				throw new APIError(500, error.message);
			}
		} catch (error) {}
	}
}

export default new MainService();
