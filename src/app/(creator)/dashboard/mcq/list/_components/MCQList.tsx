"use client";
import { deleteMcqActivity, getMcqList } from "@/app/hooks/MCQqueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";

type Props = {};

const MCQList = (props: Props) => {
	const {
		isLoading: isListLoading,
		error,
		data: mcqData,
		refetch: refetchMcqList,
	} = useQuery({
		queryKey: ["MCQList"],
		queryFn: getMcqList,
	});
	console.log("data", mcqData);

	const deleteMcqActivtyMutation = useMutation({
		mutationFn: deleteMcqActivity,
		onSuccess: () => {
			refetchMcqList();
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

	if (deleteMcqActivtyMutation.isLoading) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				Loading ...
			</div>
		);
	}

	return (
		<div className="p-5">
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead
						className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                        dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Question
							</th>
							<th scope="col" className="px-6 py-3"></th>
							<th scope="col" className="px-6 py-3"></th>
						</tr>
					</thead>
					<tbody>
						{mcqData?.map((data: any, index: number) => {
							return (
								<tr
									key={index}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
								dark:text-white">
										{data.question}
									</th>
									<td className="px-6 py-4">
										<Link
											className="w-full h-full"
											href={`/dashboard/mcq/edit/${data.id}`}>
											Edit
										</Link>
									</td>
									<td className="px-6 py-4">
										<div
											className="w-full h-full cursor-pointer"
											onClick={() => {
												deleteMcqActivtyMutation.mutate(
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

export default MCQList;
