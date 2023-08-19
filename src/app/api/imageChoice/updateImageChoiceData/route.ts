import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function PATCH(request: any) {
	const {
		activityId,
		activityName,
		correctImagesData,
		incorrectImagesData,
	}: {
		activityId: string;
		activityName: string;
		correctImagesData: { imageName: string; imgUrl: string }[];
		incorrectImagesData: { imageName: string; imgUrl: string }[];
	} = await request.json();

	if (
		!activityName ||
		correctImagesData.length === 0 ||
		incorrectImagesData.length === 0
	) {
		return new NextResponse("Missing fields", { status: 400 });
	}

	const validationImageChoice = {
		score: 0,
		wrong: 0,
		correct: 0,
	};

	const validationImageChoiceData = validationImageChoice;
	const hasSubmittedData = false;

	const ImageChoiceActivity = await prisma.imageChoiceActivity.update({
		where: {
			id: activityId,
		},
		data: {
			activityName: activityName,
			validationImageChoice: validationImageChoiceData,
			hasSubmitted: hasSubmittedData,
			correctImagesData: correctImagesData,
			incorrectImagesData: incorrectImagesData,
		},
	});

	return NextResponse.json(ImageChoiceActivity);
}
