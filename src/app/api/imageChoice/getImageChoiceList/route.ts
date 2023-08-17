export const dynamic = "force-dynamic";

import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function GET(request: any) {
	const imageChoiceActivityList = await prisma.imageChoiceActivity.findMany();

	return NextResponse.json(imageChoiceActivityList);
}
