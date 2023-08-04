import axios from "axios";
import { fibRoutes } from "../api/routes";

// gets the full list of all FIB activities
export const getFIBList = async () => {
	const res = await axios.get(`${fibRoutes.getFIBList}`);
	const data = res.data;
	return data;
};

// deletes a FIB activity
export const deleteFIBData = async ({ id }: any) => {
	const res = await axios.delete(`${fibRoutes.deleteFIBdata}`, {
		data: {
			id: id,
		},
	});
	return res.data;
};

// gets a single FIB activity
export const getFIBData = async ({ queryKey }: any) => {
	const activityId = queryKey[1];
	const res = await axios.post(`${fibRoutes.getFIBData}`, {
		activityId: activityId,
	});
	const data = res.data;
	return data;
};

export const addFIBData = async ({ question }: any) => {
	const res = await axios.post(`${fibRoutes.addFIBData}`, {
		question: question,
	});
	const data = res.data;
	return data;
};

export const updateFIBData = async ({ question, activityId }: any) => {
	const res = await axios.patch(`${fibRoutes.updateFIBData}`, {
		question: question,
		activityId: activityId,
	});
	const data = res.data;
	return data;
};
