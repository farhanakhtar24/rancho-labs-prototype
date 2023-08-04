import prisma from "@/libs/prismaDb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: any) {
	const { question }: { question: string } = await request.json();

	if (question.length === 0) {
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
		}) as Prisma.InputJsonObject[];
	const validationFIB = {
		score: 0,
		wrong: 0,
		correct: 0,
	} as Prisma.JsonObject;

	const validationFIBData = validationFIB;
	const answersData = answersArray;
	const questionData = questionArray;
	const hasSubmittedData = false;

	const FibActivity = await prisma.fibActivity.create({
		data: {
			questions: questionData,
			answers: answersData,
			hasSubmitted: hasSubmittedData,
			validationFIB: validationFIBData,
		},
	});

	return NextResponse.json(FibActivity);
}
