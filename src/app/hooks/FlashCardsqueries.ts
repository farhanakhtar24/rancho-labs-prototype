import axios from "axios";
import { flashCardRoutes } from "../api/routes";

export const addFlashCardsData = async ({ activityName, imagesData }: any) => {
	console.log(activityName, imagesData);
	const res = await axios.post(`${flashCardRoutes.addFlashCardData}`, {
		activityName: activityName,
		imagesData: imagesData,
	});
	const data = res.data;
	return data;
};

export const getFlashCardsList = async () => {
	const res = await axios.get(`${flashCardRoutes.getFlashCardList}`);
	const data = res.data;
	return data;
};

export const deleteFlashCardData = async ({ id }: any) => {
	const res = await axios.delete(`${flashCardRoutes.deleteFlashCardData}`, {
		data: {
			id: id,
		},
	});
	return res.data;
};

export const getFlashCardData = async ({ queryKey }: any) => {
	const activityId = queryKey[1];
	const res = await axios.post(`${flashCardRoutes.getFlashCardData}`, {
		activityId: activityId,
	});
	return res.data;
};
