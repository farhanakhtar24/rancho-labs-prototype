import React from "react";
import EditImageChoiceActivity from "../_component/EditImageChoiceActivity";

type Props = {};

const page = ({ params }: { params: { activityId: string } }) => {
	return <EditImageChoiceActivity activityId={params.activityId} />;
};

export default page;
