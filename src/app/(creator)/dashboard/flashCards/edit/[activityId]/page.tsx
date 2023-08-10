import React from "react";
import EditFIBActivity from "../_component/EditFIBActivity";

type Props = {};

const page = ({ params }: { params: { activityId: string } }) => {
	return <EditFIBActivity activityId={params.activityId} />;
};

export default page;
