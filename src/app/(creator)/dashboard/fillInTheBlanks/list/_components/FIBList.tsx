"use client";
import { deleteFIBActivity, getFIBList } from "@/app/hooks/FIBqueries";
import { QueryCache, useMutation, useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import axios from "axios";
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

	const deleteFIBActivityMutation = useMutation({
		mutationFn: deleteFIBActivity,
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

	if (deleteFIBActivityMutation.isLoading) {
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
						{fibData?.map((data: any, index: number) => {
							return (
								<tr
									key={index}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
								dark:text-white">
										{data.questions.join(" ")}
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
											onClick={() => {
												deleteFIBActivityMutation.mutate(
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
