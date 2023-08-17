import React from "react";
import EditFlashCards from "../_component/EditFlashCardsActivity";

type Props = {};

const page = ({ params }: { params: { activityId: string } }) => {
	return <EditFlashCards activityId={params.activityId} />;
};

export default page;
