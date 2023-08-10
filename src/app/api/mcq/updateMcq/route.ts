import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function PATCH(request: any) {
	const {
		question,
		correct,
		option1,
		option2,
		option3,
		option4,
		activityId,
	}: {
		question: string;
		correct: string[];
		option1: string;
		option2: string;
		option3: string;
		option4: string;
		activityId: string;
	} = await request.json();

	if (
		!question ||
		correct.length === 0 ||
		!option1 ||
		!option2 ||
		!option3 ||
		!option4
	) {
		// throw new Error("Missing fields");
		return new NextResponse("Missing fields", { status: 400 });
	}

	const validationMCQ = {
		score: 0,
		wrong: 0,
		correct: 0,
	};
	const hasSubmittedData = false;
	const optionsArray = [option1, option2, option3, option4];

	const mcqActivity = await prisma.mcqActivity.update({
		where: {
			id: activityId,
		},
		data: {
			question: question,
			answersArray: correct,
			optionsArray: optionsArray,
			hasSubmitted: hasSubmittedData,
			validationMCQ: validationMCQ,
		},
	});

	return NextResponse.json(mcqActivity);
}
