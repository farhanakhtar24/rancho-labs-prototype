import axios from "axios";

// gets the full list of all MCQ activities
export const getMcqList = async () => {
	const res = await axios.get("/api/mcq/getMcqList");
	const data = res.data;
	return data;
};

// deletes a MCQ activity
export const deleteMcqActivity = async ({ id }: any) => {
	await axios.delete(`/api/mcq/deleteMcqActivity`, {
		data: {
			id: id,
		},
	});
};

// gets a single FIB activity
export const getMcqActivity = async ({ queryKey }: any) => {
	const activityId = queryKey[1];
	const res = await axios.post("/api/mcq/getSingleMcqData", {
		activityId: activityId,
	});
	const data = res.data;
	return data;
};
