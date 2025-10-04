import Link from "next/link";
import Google from "./form/Google";
import Logout from "./form/Logout";

const Navbar = () => {
	return (
		<nav>
			<ul className="max-w-3xl mx-auto  flex gap-10 ">
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/signin">SignIn</Link>
				</li>
				<li>
					<Link href="/signup">SignUp</Link>
				</li>
				<li>
					<Link href="/dashboard">Dashboard</Link>
				</li>
				<li>
					<Logout />
				</li>
				<li>
					<Google />
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
