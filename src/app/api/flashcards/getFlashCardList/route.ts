import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function GET(request: any) {
	const flashCardsActivityList = await prisma.flashCardsActivity.findMany();

	return NextResponse.json(flashCardsActivityList);
}
