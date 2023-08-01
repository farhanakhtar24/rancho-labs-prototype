import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {};

const Home = async (props: Props) => {
	const session = await getServerSession(authOptions);
	const seshData = JSON.stringify(session);
	return (
		<div className="w-full bg-yellow-200 p-5">
			<h1>Server Side Rendered</h1>
			<p>{seshData}</p>
		</div>
	);
};

export default Home;
