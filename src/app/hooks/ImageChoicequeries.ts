import axios from "axios";
import { imageChoiceRoutes } from "../api/routes";

// adds image choice data to the database
export const addImageChoiceData = async ({
	activityName,
	correctImagesData,
	incorrectImagesData,
}: any) => {
	const res = await axios.post(`${imageChoiceRoutes.addImageChoiceData}`, {
		activityName: activityName,
		correctImagesData: correctImagesData,
		incorrectImagesData: incorrectImagesData,
	});
	const data = res.data;
	return data;
};

// gets image choice data List from the database
export const getImageChoiceList = async () => {
	const res = await axios.get(`${imageChoiceRoutes.getImageChoiceList}`);
	const data = res.data;
	return data;
};

// deletes a specific image choice data from the database based on the id
export const deleteImageChoiceData = async (id: any) => {
	const res = await axios.delete(
		`${imageChoiceRoutes.deleteImageChoiceData}`,
		{
			data: {
				id: id,
			},
		}
	);
	return res.data;
};
