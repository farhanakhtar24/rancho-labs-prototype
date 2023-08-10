import React from "react";
import AddFlashCards from "./_components/AddFlashCards";

type Props = {};

const page = ({ params }: { params: { activity: string } }) => {
	return <AddFlashCards />;
};

export default page;
