import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export async function DELETE(request: any) {
	const { id } = await request.json();

	await prisma.imageChoiceActivity.delete({
		where: {
			id,
		},
	});

	return NextResponse.json("Deleted successfully");
}
