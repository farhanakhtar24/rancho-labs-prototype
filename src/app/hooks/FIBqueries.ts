import axios from "axios";

// gets the full list of all FIB activities
export const getFIBList = async () => {
	const res = await axios.get("/api/getAllFIBData");
	const data = res.data;
	return data;
};

// deletes a FIB activity
export const deleteFIBActivity = async ({ id }: any) => {
	console.log(id);
	await axios.delete(`/api/deleteFIBActivity`, {
		data: {
			id: id,
		},
	});
};

// gets a single FIB activity
export const getFIBActivity = async ({ queryKey }: any) => {
	const activityId = queryKey[1];
	const res = await axios.post("/api/getFIBData", {
		activityId: activityId,
	});
	const data = res.data;
	return data;
};
