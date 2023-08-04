import React from "react";
import MCQActivity from "./_components/MCQActivity";

type Props = {};

const page = ({ params }: { params: { activity: string } }) => {
	return <MCQActivity />;
};

export default page;
