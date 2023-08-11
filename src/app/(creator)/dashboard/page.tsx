import React from "react";
import DashBoard from "./_components/DashBoard";

type Props = {};

const page = (props: Props) => {
	return (
		<>
			<div className="flex justify-center items-center font-bold text-2xl text-gray-600 pt-5">
				DASHBOARD
			</div>
			<DashBoard />
		</>
	);
};

export default page;
