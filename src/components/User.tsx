"use client";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

const User = (props: Props) => {
	const { data } = useSession();
	const seshData = JSON.stringify(data);
	return (
		<div className="w-full bg-blue-200 p-5">
			<h1>Client Side Rendered</h1>
			<p>{seshData}</p>
		</div>
	);
};

export default User;
