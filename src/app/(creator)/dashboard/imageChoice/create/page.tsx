import React from "react";
import AddFlashCards from "./_components/AddImageChoice";

type Props = {};

const page = ({ params }: { params: { activity: string } }) => {
	return <AddFlashCards />;
};

export default page;
