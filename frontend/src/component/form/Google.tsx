"use client";
import { authClient } from "@/lib/auth-client";

export default function Google() {
	async function googleLogin() {
		const currentUrl = window.location.href;
		console.log(currentUrl);
		await authClient.signIn.social({
			provider: "google",
			callbackURL: currentUrl,
		});
	}

	return <button onClick={googleLogin}>Google</button>;
}
