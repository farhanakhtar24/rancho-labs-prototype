"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const LogoutBtn = (props: Props) => {
	const router = useRouter();
	return (
		<button
			onClick={() => {
				signOut({ callbackUrl: "/login" });
			}}
			className="p-2 bg-black text-white">
			LogoutBtn
		</button>
	);
};

export default LogoutBtn;
