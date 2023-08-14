import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function PATCH(request: any) {
	const {
		activityId,
		activityName,
		imagesData,
	}: {
		activityId: string;
		activityName: string;
		imagesData: { imageName: string; imgUrl: string }[];
	} = await request.json();

	if (!activityId || !activityName || imagesData.length === 0) {
		return new NextResponse("Missing fields", { status: 400 });
	}

	const validationFlashCards = {
		score: 0,
		wrong: 0,
		correct: 0,
	};

	const validationFlaschCardsData = validationFlashCards;
	const hasSubmittedData = false;

	console.log({
		activityId,
		activityName,
		imagesData,
		validationFlaschCardsData,
		hasSubmittedData,
	});

	const FlashCardsActivity = await prisma.flashCardsActivity.update({
		where: {
			id: activityId,
		},
		data: {
			activityName: activityName,
			imagesData: imagesData,
			validationFlashCards: validationFlaschCardsData,
			hasSubmitted: hasSubmittedData,
		},
	});

	return NextResponse.json(FlashCardsActivity);
}
