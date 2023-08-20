"use client";
import { addFIBData } from "@/app/hooks/FIBqueries";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { FormEvent, FormEventHandler, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

const FIBActivity = (props: Props) => {
	const [question, setQuestion] = useState("");
	const router = useRouter();
	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const FIBActivity = await addFIBDataMutation.mutateAsync({
			question: question,
		});
		console.log("FIBActivity:", FIBActivity);
	};

	const addFIBDataMutation = useMutation({
		mutationKey: ["addFIBData", question],
		mutationFn: addFIBData,
		onSuccess: () => {
			toast.success("added data");
			router.replace("/dashboard/fillInTheBlanks/list");
		},
	});

	return (
		<form className="p-10 w-1/2" onSubmit={submitHandler}>
			<div className="mb-6">
				<label className="block mb-2 text-sm font-medium text-gray-900">
					Question
				</label>
				<input
					type="question"
					id="question"
					className="bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg 
					focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
					dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
					dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Apple is a *red* coloured fruit."
					required
					onChange={(e) => {
						setQuestion(e.target.value);
					}}
					value={question}
				/>
			</div>

			<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
				focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
				dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
				Submit
			</button>
		</form>
	);
};

export default FIBActivity;
