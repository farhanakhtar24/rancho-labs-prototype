import axios from "axios";

export const getFIBList = async () => {
	const res = await axios.get("/api/getAllFIBData");
	const data = res.data;
	return data;
};

export const deleteFIBActivity = async ({ id }: any) => {
	console.log(id);
	await axios.delete(`/api/deleteFIBActivity`, {
		data: {
			id: id,
		},
	});
};
