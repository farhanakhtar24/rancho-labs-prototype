import React from "react";
import FIBActivity from "./_components/FIBActivity";

type Props = {};

const page = ({ params }: { params: { activity: string } }) => {
	return <FIBActivity />;
};

export default page;
