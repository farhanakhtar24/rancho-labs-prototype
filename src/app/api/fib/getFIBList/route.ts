export const dynamic = "force-dynamic";

import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function GET(request: any) {
	const fibActivity = await prisma.fibActivity.findMany();

	return NextResponse.json(fibActivity);
}
