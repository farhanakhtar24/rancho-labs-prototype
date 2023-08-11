"use client";
import { deleteFIBData, getFIBList } from "@/app/hooks/FIBqueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";

type Props = {};

const FIBList = (props: Props) => {
	const {
		isLoading: isListLoading,
		error,
		data: fibData,
		refetch: refetchFIBList,
	} = useQuery({
		queryKey: ["FIBActivitiesList"],
		queryFn: getFIBList,
	});

	const deleteFIBDataMutation = useMutation({
		mutationFn: deleteFIBData,
		onSuccess: () => {
			refetchFIBList();
			toast.success("Successfully deleted!");
		},
	});

	if (isListLoading) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				Loading ...
			</div>
		);
	}

	if (deleteFIBDataMutation.isLoading) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				Loading ...
			</div>
		);
	}

	console.log("data", fibData);

	return (
		<div className="p-5">
			<div className="flex justify-center items-center font-bold text-2xl text-gray-600 pb-5">
				Fill In The Blanks List
			</div>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead
						className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                        dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Question
							</th>
							<th scope="col" className="px-6 py-3">
								Answer
							</th>
							<th scope="col" className="px-6 py-3"></th>
							<th scope="col" className="px-6 py-3"></th>
						</tr>
					</thead>
					<tbody>
						{fibData?.map((data: any, index: number) => {
							const question = data.questions.join(" ");
							const answer = data.answers
								.map((answerObject: any) => {
									return answerObject.answer;
								})
								.join(", ");
							return (
								<tr
									key={index}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
								dark:text-white">
										{question}
									</th>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
								dark:text-white">
										{answer}
									</th>
									<td className="px-6 py-4">
										<Link
											className="w-full h-full"
											href={`/dashboard/fillInTheBlanks/edit/${data.id}`}>
											Edit
										</Link>
									</td>
									<td className="px-6 py-4">
										<div
											className="w-full h-full cursor-pointer"
											onClick={async (e) => {
												e.preventDefault();
												await deleteFIBDataMutation.mutateAsync(
													{
														id: data.id,
													}
												);
											}}>
											Delete
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default FIBList;
