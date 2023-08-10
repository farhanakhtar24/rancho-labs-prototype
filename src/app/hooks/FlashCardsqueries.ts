import axios from "axios";
import { flashCardRoutes } from "../api/routes";

export const addFlashCardsData = async ({ activityName, imgUrls }: any) => {
	const res = await axios.post(`${flashCardRoutes.addFlashCardData}`, {
		activityName: activityName,
		imgUrls: imgUrls,
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
