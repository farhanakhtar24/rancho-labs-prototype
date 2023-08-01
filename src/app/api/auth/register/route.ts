import primsa from "@/libs/prismaDb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: any) {
	const { email, password, name } = await request.json();

	if (!email || !password || !name) {
		return new NextResponse("Missing fields", { status: 400 });
	}
	const exist = await primsa.user.findUnique({
		where: {
			email,
		},
	});

	if (exist) {
		return new NextResponse("User already exists", { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await primsa.user.create({
		data: {
			email,
			hashedPassword,
			name,
		},
	});

	return NextResponse.json(user);
}
