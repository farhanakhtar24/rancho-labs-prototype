"use client";
import {
	deleteFlashCardData,
	getFlashCardsList,
} from "@/app/hooks/FlashCardsqueries";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";

type Props = {};

const FlashCardsList = (props: Props) => {
	const {
		isLoading: isListLoading,
		error,
		data: flashCardsData,
		refetch: refetchFlashCardsList,
	} = useQuery({
		queryKey: ["FlashCardsList"],
		queryFn: getFlashCardsList,
	});

	const deleteFLashCardDataMutation = useMutation({
		mutationFn: deleteFlashCardData,
		onSuccess: () => {
			toast.success("deleted data");
			refetchFlashCardsList();
		},
	});

	if (isListLoading) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				Loading ...
			</div>
		);
	}

	if (deleteFLashCardDataMutation.isLoading) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				Loading ...
			</div>
		);
	}

	console.log("data", flashCardsData);

	return (
		<div className="p-5">
			<div className="flex justify-center items-center font-bold text-2xl text-gray-600 pb-5">
				Flashcards List
			</div>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead
						className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                        dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Activity
							</th>
							<th scope="col" className="px-6 py-3">
								Images
							</th>
							<th scope="col" className="px-6 py-3"></th>
							<th scope="col" className="px-6 py-3"></th>
						</tr>
					</thead>
					<tbody>
						{flashCardsData?.map((data: any, index: number) => {
							const { activityName } = data;
							const { imgUrls } = data;
							return (
								<tr
									key={index}
									className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
								dark:text-white">
										{activityName}
									</th>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
								dark:text-white">
										{imgUrls && (
											<div className="flex flex-row gap-2">
												{imgUrls.map(
													(
														imgUrl: string,
														idx: number
													) => {
														return (
															<img
																key={idx}
																src={imgUrl}
																className="w-20 h-auto"
															/>
														);
													}
												)}
											</div>
										)}
									</th>
									<td className="px-6 py-4">
										<Link
											className="w-full h-full"
											href={`/dashboard/flashCards/edit/${data.id}`}>
											Edit
										</Link>
									</td>
									<td className="px-6 py-4">
										<div
											className="w-full h-full cursor-pointer"
											onClick={async (e) => {
												e.preventDefault();
												await deleteFLashCardDataMutation.mutateAsync(
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

export default FlashCardsList;
