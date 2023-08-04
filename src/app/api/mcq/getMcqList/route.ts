import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function GET(request: any) {
	const mcqActivity = await prisma.mcqActivity.findMany();
	return NextResponse.json(mcqActivity);
}
