"use client";
import {
	getImageChoiceData,
	updateImageChoiceData,
} from "@/app/hooks/ImageChoicequeries";
import Spinner from "@/components/Spinner";
import { storage } from "@/firebase/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 } from "uuid";

type Props = {
	activityId: string;
};
const EditImageChoiceActivity = ({ activityId }: Props) => {
	const router = useRouter();
	const [activtityName, setactivtityName] = useState("");
	const [uploadingAndSubmitting, setUploadingAndSubmitting] = useState(false);
	const [deletingImage, setDeletingImage] = useState(false);
	const [newCorrectImages, setNewCorrectImages] = useState<File[] | null>(
		null
	);
	const [newIncorrectImages, setNewIncorrectImages] = useState<File[] | null>(
		null
	);

	const [oldImagesData, setoldImagesData] = useState<{
		correctImagesData: { imageName: string; imgUrl: string }[];
		incorrectImagesData: { imageName: string; imgUrl: string }[];
	}>({
		correctImagesData: [],
		incorrectImagesData: [],
	});

	const deleteImage = async (imageName: string, imageType: string) => {
		const imageRef = ref(
			storage,
			`imageChoice/${activtityName}/${imageName}`
		);
		await deleteObject(imageRef);
		//delete image from db
		if (imageType === "correctImagesData") {
			const filterImagesData = oldImagesData.correctImagesData.filter(
				(image) => image.imageName !== imageName
			);
			const imageChoiceActivity =
				await updateImageChoiceDataMutation.mutateAsync({
					activityId,
					activityName: activtityName,
					correctImagesData: filterImagesData,
					incorrectImagesData: oldImagesData.incorrectImagesData,
				});
			console.log("imageChoiceActivity:", imageChoiceActivity);
		} else if (imageType === "incorrectImagesData") {
			const filterImagesData = oldImagesData.incorrectImagesData.filter(
				(image) => image.imageName !== imageName
			);
			const imageChoiceActivity =
				await updateImageChoiceDataMutation.mutateAsync({
					activityId,
					activityName: activtityName,
					correctImagesData: oldImagesData.correctImagesData,
					incorrectImagesData: filterImagesData,
				});
			console.log("imageChoiceActivity:", imageChoiceActivity);
		}
	};

	const uploadImage = async (image: File) => {
		const imageName = image.name + v4();
		const imageRef = ref(
			storage,
			`imageChoice/${activtityName}/${imageName}`
		);
		const res = await uploadBytes(imageRef, image);
		const imgUrl = await getDownloadURL(res.ref);
		return { imageName, imgUrl };
	};

	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newCorrectImages && !newIncorrectImages && !activtityName) {
			toast.error("Please add images and activity name");
			return;
		} else if (!activtityName) {
			toast.error("Please add activity name");
			return;
		} else if (!newCorrectImages || !newIncorrectImages) {
			toast.error("Please add all images");
			return;
		}

		let correctImagesData: { imageName: string; imgUrl: string }[] = [];
		let incorrectImagesData: { imageName: string; imgUrl: string }[] = [];

		// set loading
		setUploadingAndSubmitting(true);
		// upload images to firebase storage and block the code until all images are uploaded
		for (let i = 0; i < newCorrectImages.length; i++) {
			const data = await uploadImage(newCorrectImages[i]);
			correctImagesData.push(data);
		}
		for (let i = 0; i < newIncorrectImages.length; i++) {
			const data = await uploadImage(newIncorrectImages[i]);
			incorrectImagesData.push(data);
		}

		// dont add data to db until all images are uploaded
		const imageChoiceActivity =
			await updateImageChoiceDataMutation.mutateAsync({
				activityId: activityId,
				activityName: activtityName,
				correctImagesData: [
					...correctImagesData,
					...oldImagesData.correctImagesData,
				],
				incorrectImagesData: [
					...incorrectImagesData,
					...oldImagesData.incorrectImagesData,
				],
			});
		// unset loading
		setUploadingAndSubmitting(false);
		toast.success("Activity Updated");
		router.replace("/dashboard/imageChoice/list");
		console.log("imageChoiceActivity:", imageChoiceActivity);
	};

	const updateImageChoiceDataMutation = useMutation({
		mutationKey: ["updateImageChoiceData"],
		mutationFn: updateImageChoiceData,
		onSuccess: (data: any) => {
			refetchImageChoiceActivityData();
		},
	});

	const {
		data: imageChoiceActivityData,
		isLoading: isLoadingImageChoiceActivityData,
		refetch: refetchImageChoiceActivityData,
	} = useQuery({
		queryKey: ["imageChoiceActivityData", activityId],
		queryFn: getImageChoiceData,
		onSuccess: (data: any) => {
			setactivtityName(data.activityName);
			setoldImagesData({
				correctImagesData: data.correctImagesData,
				incorrectImagesData: data.incorrectImagesData,
			});
		},
	});
	if (isLoadingImageChoiceActivityData)
		return (
			<div className=" w-screen h-[80vh] flex justify-center items-center">
				<Spinner size="lg" />
			</div>
		);

	console.log("imageChoiceActivityData:", imageChoiceActivityData);

	return (
		<form className="p-10 w-1/2" onSubmit={submitHandler}>
			<div className="mb-6">
				<label className="block mb-2 text-sm font-medium text-gray-900">
					Activtity Name
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
						setactivtityName(e.target.value);
					}}
					value={activtityName}
				/>
			</div>

			{/* old image div */}
			<div className="w-full grid grid-cols-2 gap-2">
				{oldImagesData.correctImagesData && (
					<div className="grid grid-cols-3 gap-2 mb-3 bg-gray-300 p-2 rounded">
						{oldImagesData.correctImagesData.map((image, idx) => {
							// render images along a delete button
							return (
								<>
									<div className="relative" key={idx}>
										{deletingImage && (
											<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
												<Spinner size="sm" />
											</div>
										)}
										<img
											src={image.imgUrl}
											alt="image"
											className="w-full h-full rounded-lg"
										/>
										<button
											type="button"
											className="absolute top-0 right-0 text-white bg-red-700 hover:bg-red-800
									focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg
									text-sm w-8 h-8 text-center dark:bg-red-600 dark:hover:bg-red-700
									dark:focus:ring-red-800"
											onClick={async () => {
												setDeletingImage(true);
												await deleteImage(
													image.imageName,
													"correctImagesData"
												);
												setDeletingImage(false);
											}}>
											X
										</button>
									</div>
								</>
							);
						})}
					</div>
				)}
				{oldImagesData.incorrectImagesData && (
					<div className="grid grid-cols-3 gap-2 mb-3 bg-gray-300 p-2 rounded">
						{oldImagesData.incorrectImagesData.map((image, idx) => {
							// render images along a delete button
							return (
								<>
									<div className="relative" key={idx}>
										{deletingImage && (
											<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
												<Spinner size="sm" />
											</div>
										)}
										<img
											src={image.imgUrl}
											alt="image"
											className="w-full h-full rounded-lg"
										/>
										<button
											type="button"
											className="absolute top-0 right-0 text-white bg-red-700 hover:bg-red-800
									focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg
									text-sm w-8 h-8 text-center dark:bg-red-600 dark:hover:bg-red-700
									dark:focus:ring-red-800"
											onClick={async () => {
												setDeletingImage(true);
												await deleteImage(
													image.imageName,
													"incorrectImagesData"
												);
												setDeletingImage(false);
											}}>
											X
										</button>
									</div>
								</>
							);
						})}
					</div>
				)}
			</div>

			{/* new image div */}
			<div className="w-full grid grid-cols-2 gap-2">
				{!newCorrectImages && (
					<div className="flex items-center justify-center w-full mb-3">
						<label
							htmlFor="new-correctImages"
							className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 
						border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 
						hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg
									className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 16">
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
									/>
								</svg>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold">
										Click to upload new Images
									</span>
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									SVG, PNG, JPG or GIF (MAX. 800x400px)
								</p>
							</div>
							<input
								id="new-correctImages"
								type="file"
								className="hidden"
								multiple
								onChange={(e) => {
									const files = e.target.files;
									if (files) {
										setNewCorrectImages(Array.from(files));
									}
								}}
							/>
						</label>
					</div>
				)}
				{newCorrectImages && (
					<div className="grid grid-cols-3 gap-2 mb-3 bg-gray-300 p-2 rounded">
						{newCorrectImages.map((image, idx) => (
							// render images along a delete button
							<div className="relative" key={idx}>
								<img
									src={URL.createObjectURL(image)}
									alt="image"
									className="w-full h-full rounded-lg"
								/>
								<button
									type="button"
									className="absolute top-0 right-0 text-white bg-red-700 
									hover:bg-red-800 focus:ring-4 focus:outline-none 
									focus:ring-red-300 font-medium rounded-lg text-sm w-8 h-8 text-center 
									dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
									onClick={() => {
										setNewCorrectImages((prev) => {
											if (prev) {
												return prev.filter(
													(_, i) => i !== idx
												);
											}
											return null;
										});
									}}>
									X
								</button>
							</div>
						))}
					</div>
				)}
				{!newIncorrectImages && (
					<div className="flex items-center justify-center w-full mb-3">
						<label
							htmlFor="new-correctImages"
							className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 
						border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 
						hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg
									className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 16">
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
									/>
								</svg>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold">
										Click to upload new incorrect Images
									</span>
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									SVG, PNG, JPG or GIF (MAX. 800x400px)
								</p>
							</div>
							<input
								id="new-correctImages"
								type="file"
								className="hidden"
								multiple
								onChange={(e) => {
									const files = e.target.files;
									if (files) {
										setNewIncorrectImages(
											Array.from(files)
										);
									}
								}}
							/>
						</label>
					</div>
				)}
				{newIncorrectImages && (
					<div className="grid grid-cols-3 gap-2 mb-3 bg-gray-300 p-2 rounded">
						{newIncorrectImages.map((image, idx) => (
							// render images along a delete button
							<div className="relative" key={idx}>
								<img
									src={URL.createObjectURL(image)}
									alt="image"
									className="w-full h-full rounded-lg"
								/>
								<button
									type="button"
									className="absolute top-0 right-0 text-white bg-red-700
									hover:bg-red-800 focus:ring-4 focus:outline-none
									focus:ring-red-300 font-medium rounded-lg text-sm w-8 h-8 text-center
									dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
									onClick={() => {
										setNewIncorrectImages((prev) => {
											if (prev) {
												return prev.filter(
													(_, i) => i !== idx
												);
											}
											return null;
										});
									}}>
									X
								</button>
							</div>
						))}
					</div>
				)}
			</div>

			<div className="flex gap-2">
				{newCorrectImages && (
					<label
						htmlFor="correctImages"
						className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none 
							focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
							dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 cursor-pointer">
						<span>Add More Correct Images</span>

						<input
							id="correctImages"
							type="file"
							className="hidden"
							multiple
							onChange={(e) => {
								const files = e.target.files;
								if (files) {
									setNewCorrectImages((prev) => {
										if (prev) {
											return [
												...prev,
												...Array.from(files),
											];
										}
										return Array.from(files);
									});
								}
							}}
						/>
					</label>
				)}
				{newIncorrectImages && (
					<label
						htmlFor="incorrectImages"
						className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none 
							focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
							dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 cursor-pointer">
						<span>Add More Incorrect Images</span>

						<input
							id="incorrectImages"
							type="file"
							className="hidden"
							multiple
							onChange={(e) => {
								const files = e.target.files;
								if (files) {
									setNewIncorrectImages((prev) => {
										if (prev) {
											return [
												...prev,
												...Array.from(files),
											];
										}
										return Array.from(files);
									});
								}
							}}
						/>
					</label>
				)}

				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
				focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
				dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex gap-2">
					{uploadingAndSubmitting && <Spinner size="sm" />}
					Upload & Submit
				</button>
				<button
					onClick={() => {
						setNewCorrectImages(null);
						setNewIncorrectImages(null);
						setUploadingAndSubmitting(false);
					}}
					className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
				focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
				dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
					Reset New Images
				</button>
			</div>
		</form>
	);
};

export default EditImageChoiceActivity;
