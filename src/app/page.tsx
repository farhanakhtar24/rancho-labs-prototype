import Home from "@/components/Home";
import LogoutBtn from "@/components/LogoutBtn";
import User from "@/components/User";
import React from "react";

type Props = {};

const page = (props: Props) => {
	return (
		<div className="w-full flex flex-col p-5">
			<Home />
			<User />
		</div>
	);
};

export default page;
