"use client";
import {
	deleteImageChoiceData,
	getImageChoiceList,
} from "@/app/hooks/ImageChoicequeries";
import Spinner from "@/components/Spinner";
import { storage } from "@/firebase/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteObject, ref } from "firebase/storage";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";

type Props = {};

const ImageChoiceList = (props: Props) => {
	const {
		isLoading: isLoadingImageChoiceList,
		error,
		data: ImageChoiceData,
		refetch: refetchImageChoiceList,
	} = useQuery({
		queryKey: ["FlashCardsList"],
		queryFn: getImageChoiceList,
	});

	const deleteImages = async (imageChoiceData: any) => {
		const activityName = imageChoiceData.activityName;
		const correctImagesData: { imageName: string; imgUrl: string }[] =
			imageChoiceData.correctImagesData;
		const incorrectImagesData: { imageName: string; imgUrl: string }[] =
			imageChoiceData.incorrectImagesData;
		correctImagesData.map(async (imageData) => {
			const imageRef = ref(
				storage,
				`imageChoice/${activityName}/${imageData.imageName}`
			);
			await deleteObject(imageRef);
		});

		incorrectImagesData.map(async (imageData) => {
			const imageRef = ref(
				storage,
				`imageChoice/${activityName}/${imageData.imageName}`
			);
			await deleteObject(imageRef);
		});
	};

	const deleteImageChoiceDataMutation = useMutation({
		mutationFn: deleteImageChoiceData,
		onSuccess: () => {
			refetchImageChoiceList();
			toast.success("deleted data");
		},
	});

	if (isLoadingImageChoiceList) {
		return (
			<div className=" w-screen h-[80vh] flex justify-center items-center">
				<Spinner size="lg" />
			</div>
		);
	}

	if (deleteImageChoiceDataMutation.isLoading) {
		return (
			<div className=" w-screen h-[80vh] flex justify-center items-center">
				<Spinner size="lg" />
			</div>
		);
	}

	console.log("ImageChoiceData", ImageChoiceData);

	return (
		<div className="p-5">
			<div className="flex justify-center items-center font-bold text-2xl text-gray-600 pb-5">
				Image Choice List
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
								Correct Images
							</th>
							<th scope="col" className="px-6 py-3">
								Incorrect Images
							</th>
							<th scope="col" className="px-6 py-3"></th>
							<th scope="col" className="px-6 py-3"></th>
						</tr>
					</thead>
					<tbody>
						{ImageChoiceData?.map((data: any, index: number) => {
							const { activityName } = data;
							const { correctImagesData } = data;
							const { incorrectImagesData } = data;

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
										{correctImagesData && (
											<div className="flex flex-row gap-2">
												{correctImagesData.map(
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
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
								dark:text-white">
										{incorrectImagesData && (
											<div className="flex flex-row gap-2">
												{incorrectImagesData.map(
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
											href={`/dashboard/imageChoice/edit/${data.id}`}>
											Edit
										</Link>
									</td>
									<td className="px-6 py-4">
										<div
											className="w-full h-full cursor-pointer"
											onClick={async (e) => {
												e.preventDefault();
												await deleteImages(data);
												await deleteImageChoiceDataMutation.mutateAsync(
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

export default ImageChoiceList;
