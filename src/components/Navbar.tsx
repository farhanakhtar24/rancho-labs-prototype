import Link from "next/link";
import React from "react";
import LogoutBtn from "./LogoutBtn";

type Props = {};

const Navbar = (props: Props) => {
	return (
		<ul className="w-full p-5 bg-cyan-200 flex items-center justify-between">
			<ul className="w-full flex gap-5 items-center">
				<Link href={`/`}>
					<li>Home</li>
				</Link>
				<Link href={`/login`}>
					<li>Login</li>
				</Link>
				<Link href={`/register`}>
					<li>Register</li>
				</Link>
				<Link href={`/dashboard`}>
					<li>Dashboard</li>
				</Link>
			</ul>
			<ul>
				<li>
					<LogoutBtn />
				</li>
			</ul>
		</ul>
	);
};

export default Navbar;
