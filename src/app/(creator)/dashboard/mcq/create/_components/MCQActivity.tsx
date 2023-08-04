"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, FormEventHandler, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

const MCQActivity = (props: Props) => {
	const router = useRouter();
	const [data, setData] = useState<{
		question: string;
		option1: string;
		option2: string;
		option3: string;
		option4: string;
		correct: string[];
	}>({
		question: "",
		option1: "",
		option2: "",
		option3: "",
		option4: "",
		correct: [],
	});

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await axios.post("/api/mcq/addMcq", {
				question: data.question,
				correct: data.correct,
				option1: data.option1,
				option2: data.option2,
				option3: data.option3,
				option4: data.option4,
			});
			console.log("res.data: ", res.data);
			toast.success("Activity created successfully");
			router.replace(`/dashboard/mcq/list`);
		} catch (err) {
			toast.error("Something went wrong");
		}
	};

	return (
		<form className="p-10 w-2/3" onSubmit={submitHandler}>
			<div className="mb-6 flex flex-col gap-7">
				<div className="flex flex-col gap-2">
					<label className="block text-sm font-medium text-gray-900">
						Question
					</label>
					<input
						type="question"
						id="question"
						placeholder="Apple is a *red* coloured fruit."
						required
						onChange={(e) => {
							setData(
								(data) =>
									({
										...data,
										question: e.target.value,
									} as any)
							);
						}}
						className={`bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg 
							focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
							dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
							dark:focus:ring-blue-500 dark:focus:border-blue-500`}
						value={data.question}
					/>
				</div>
				<div className="flex flex-col gap-2">
					{/* OPTION 1 */}
					<div className="flex gap-1 items-center">
						<input
							type="text"
							id="option1"
							placeholder="Option 1"
							required
							className={`bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg 
							focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
							dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
							dark:focus:ring-blue-500 dark:focus:border-blue-500`}
							value={data.option1}
							onChange={(e) => {
								setData(
									(data) =>
										({
											...data,
											option1: e.target.value,
										} as any)
								);
							}}
						/>
						<input
							id="checkbox"
							type="checkbox"
							value=""
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
							focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
							focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							onChange={(e) => {
								if (e.target.checked) {
									setData(
										(data) =>
											({
												...data,
												correct: [
													...data.correct,
													data.option1,
												],
											} as any)
									);
								} else {
									setData(
										(data) =>
											({
												...data,
												correct: data.correct.filter(
													(x) => x !== data.option1
												),
											} as any)
									);
								}
							}}
						/>
						<label
							htmlFor="default-checkbox"
							className="text-sm font-medium text-gray-900 dark:text-gray-900">
							correct
						</label>
					</div>
					{/* OPTION 2 */}
					<div className="flex gap-1 items-center">
						<input
							type="text"
							id="option2"
							placeholder="Option 2"
							required
							className={`bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg 
							focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
							dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
							dark:focus:ring-blue-500 dark:focus:border-blue-500`}
							value={data.option2}
							onChange={(e) => {
								setData(
									(data) =>
										({
											...data,
											option2: e.target.value,
										} as any)
								);
							}}
						/>
						<input
							id="checkbox"
							type="checkbox"
							value=""
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
							focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
							focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							onChange={(e) => {
								if (e.target.checked) {
									setData(
										(data) =>
											({
												...data,
												correct: [
													...data.correct,
													data.option2,
												],
											} as any)
									);
								} else {
									setData(
										(data) =>
											({
												...data,
												correct: data.correct.filter(
													(x) => x !== data.option2
												),
											} as any)
									);
								}
							}}
						/>
						<label
							htmlFor="default-checkbox"
							className="text-sm font-medium text-gray-900 dark:text-gray-900">
							correct
						</label>
					</div>
					{/* OPTION 3 */}
					<div className="flex gap-1 items-center">
						<input
							type="text"
							id="option3"
							placeholder="Option 3"
							required
							className={`bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg 
							focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
							dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
							dark:focus:ring-blue-500 dark:focus:border-blue-500`}
							value={data.option3}
							onChange={(e) => {
								setData(
									(data) =>
										({
											...data,
											option3: e.target.value,
										} as any)
								);
							}}
						/>
						<input
							id="checkbox"
							type="checkbox"
							value=""
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
							focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
							focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							onChange={(e) => {
								if (e.target.checked) {
									setData(
										(data) =>
											({
												...data,
												correct: [
													...data.correct,
													data.option3,
												],
											} as any)
									);
								} else {
									setData(
										(data) =>
											({
												...data,
												correct: data.correct.filter(
													(x) => x !== data.option3
												),
											} as any)
									);
								}
							}}
						/>
						<label
							htmlFor="default-checkbox"
							className="text-sm font-medium text-gray-900 dark:text-gray-900">
							correct
						</label>
					</div>
					{/* OPTION 4 */}
					<div className="flex gap-1 items-center">
						<input
							type="text"
							id="option4"
							placeholder="Option 4"
							required
							className={`bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg 
							focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
							dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
							dark:focus:ring-blue-500 dark:focus:border-blue-500`}
							value={data.option4}
							onChange={(e) => {
								setData(
									(data) =>
										({
											...data,
											option4: e.target.value,
										} as any)
								);
							}}
						/>
						<input
							id="checkbox"
							type="checkbox"
							value=""
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded 
							focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
							focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							onChange={(e) => {
								if (e.target.checked) {
									setData(
										(data) =>
											({
												...data,
												correct: [
													...data.correct,
													data.option4,
												],
											} as any)
									);
								} else {
									setData(
										(data) =>
											({
												...data,
												correct: data.correct.filter(
													(x) => x !== data.option4
												),
											} as any)
									);
								}
							}}
						/>
						<label
							htmlFor="default-checkbox"
							className="text-sm font-medium text-gray-900 dark:text-gray-900">
							correct
						</label>
					</div>
				</div>
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

export default MCQActivity;
