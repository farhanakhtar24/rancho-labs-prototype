"use client";
import {
	deleteFlashCardData,
	getFlashCardsList,
} from "@/app/hooks/FlashCardsqueries";
import Spinner from "@/components/Spinner";
import { storage } from "@/firebase/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteObject, ref } from "firebase/storage";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";

type Props = {};

const FlashCardsList = (props: Props) => {
	const {
		isLoading: isLoadingFlashCardsList,
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
			refetchFlashCardsList();
			toast.success("deleted data");
		},
	});

	const deleteImages = async (flashCardsData: any) => {
		// flashCardsData.
		const activityName = flashCardsData.activityName;
		const imagesData: { imageName: string; imgUrl: string }[] =
			flashCardsData.imagesData;
		console.log("imagesData", imagesData);
		console.log("activityName", activityName);

		imagesData.map(async (imageData) => {
			const imageRef = ref(
				storage,
				`flashCards/${activityName}/${imageData.imageName}`
			);
			await deleteObject(imageRef);
		});
	};

	if (isLoadingFlashCardsList) {
		return (
			<div className=" w-screen h-[80vh] flex justify-center items-center">
				<Spinner size="lg" />
			</div>
		);
	}

	if (deleteFLashCardDataMutation.isLoading) {
		return (
			<div className=" w-screen h-[80vh] flex justify-center items-center">
				<Spinner size="lg" />
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
							const { imagesData } = data;

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
										{imagesData && (
											<div className="flex flex-row gap-2">
												{imagesData.map(
													(
														imageData: any,
														idx: number
													) => {
														return (
															<img
																key={idx}
																src={
																	imageData.imgUrl
																}
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
												await deleteImages(data);
												// remove data from firestore
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
