import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function POST(request: any) {
	const {
		question,
		correct,
		option1,
		option2,
		option3,
		option4,
	}: {
		question: string;
		correct: string[];
		option1: string;
		option2: string;
		option3: string;
		option4: string;
	} = await request.json();

	if (
		!question ||
		correct.length === 0 ||
		!option1 ||
		!option2 ||
		!option3 ||
		!option4
	) {
		return new NextResponse("Missing fields", { status: 400 });
	}

	const validationMCQ = {
		score: 0,
		wrong: 0,
		correct: 0,
	};
	const hasSubmittedData = false;
	const optionsArray = [option1, option2, option3, option4];

	const mcqActivity = await prisma.mcqActivity.create({
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
