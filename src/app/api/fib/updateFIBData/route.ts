import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function PATCH(request: any) {
	const { question, activityId }: { question: string; activityId: any } =
		await request.json();
	if (question.length === 0 || activityId.length === 0) {
		return new NextResponse("Missing fields", { status: 400 });
	}

	const questionArray: string[] = question.split(" ");
	const answersArray = question
		.split(" ")
		.filter((word: string) => {
			if (word.includes("*")) {
				return true;
			}
		})
		.map((word: string, index: number) => {
			return {
				index: index + 1,
				answer: word.replaceAll("*", "").replaceAll(".", ""),
			};
		});
	const validationFIB = {
		score: 0,
		wrong: 0,
		correct: 0,
	};

	const validationFIBData = validationFIB;
	const answersData = answersArray;
	const questionData = questionArray;
	const hasSubmittedData = false;
	const FibActivity = await prisma.fibActivity.update({
		where: {
			id: activityId,
		},
		data: {
			questions: questionData,
			answers: answersData,
			hasSubmitted: hasSubmittedData,
			validationFIB: validationFIBData,
		},
	});

	return NextResponse.json(FibActivity);
}
