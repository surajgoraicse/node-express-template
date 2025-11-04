"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const Logout = () => {
	async function logout() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					redirect("/signin"); // redirect to login page
				},
			},
		});
	}
	return <button onClick={logout}>logout</button>;
};

export default Logout;
