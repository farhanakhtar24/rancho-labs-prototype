export const dynamic = "force-dynamic";

import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function POST(request: any) {
	const { activityId } = await request.json();
	console.log("activityId", activityId);
	const fibActivity = await prisma.mcqActivity.findFirst({
		where: {
			id: activityId,
		},
	});

	return NextResponse.json(fibActivity);
}
