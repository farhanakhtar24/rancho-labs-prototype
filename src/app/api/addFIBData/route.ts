import prisma from "@/libs/prismaDb";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: any) {
	const { question, hasSubmitted, validationFIB, answers } =
		await request.json();
	if (question.length === 0 || answers.length === 0) {
		return new NextResponse("Missing fields", { status: 400 });
	}

	const validationFIBData = validationFIB as Prisma.JsonObject;
	const answersData = answers as Prisma.InputJsonObject[];
	const questionData = question;
	const hasSubmittedData = hasSubmitted as boolean;

	if (!validationFIBData || !question) {
		return new NextResponse("Missing fields", { status: 400 });
	}

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
