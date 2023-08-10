import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function POST(request: any) {
	const {
		activityName,
		imgUrls,
	}: { activityName: string; imgUrls: string[] } = await request.json();

	if (!activityName || imgUrls.length === 0) {
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
		activityName,
		imgUrls,
		validationFlaschCardsData,
		hasSubmittedData,
	});

	const FlashCardsActivity = await prisma.flashCardsActivity.create({
		data: {
			activityName: activityName,
			imgUrls: imgUrls,
			validationFlashCards: validationFlaschCardsData,
			hasSubmitted: hasSubmittedData,
		},
	});

	return NextResponse.json(FlashCardsActivity);
}
