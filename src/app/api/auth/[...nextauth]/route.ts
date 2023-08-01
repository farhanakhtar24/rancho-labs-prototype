import client from "@/libs/prismaDb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(client),
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "email",
					type: "text",
					placeholder: "jsmith@gmail.com",
				},
				password: { label: "Password", type: "password" },
				username: {
					label: "Username",
					type: "text",
					placeholder: "jsmith",
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Missing fields");
				}

				const user = await client.user.findFirst({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user?.hashedPassword) {
					throw new Error("User not found");
				}

				const passwordMatch = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				);

				if (!passwordMatch) {
					throw new Error("Incorrect password");
				}

				return user;
			},
		}),
	],
	secret: process.env.SECRET,
	session: {
		strategy: "jwt",
	},
	debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
