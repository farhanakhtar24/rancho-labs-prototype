"use client";
import { addImageChoiceData } from "@/app/hooks/ImageChoicequeries";
import Spinner from "@/components/Spinner";
import { storage } from "@/firebase/config";
import { useMutation } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 } from "uuid";

type Props = {};

const AddImageChoice = (props: Props) => {
	const router = useRouter();
	const [activtityName, setactivtityName] = useState("");
	const [correctImages, setCorrectImages] = useState<File[] | null>(null);
	const [incorrectImages, setIncorrectImages] = useState<File[] | null>(null);
	const [uploadingAndSubmitting, setUploadingAndSubmitting] = useState(false);

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
		if (!correctImages && !incorrectImages && !activtityName) {
			toast.error("Please add images and activity name");
			return;
		} else if (!activtityName) {
			toast.error("Please add activity name");
			return;
		} else if (!correctImages || !incorrectImages) {
			toast.error("Please add all images");
			return;
		}

		let correctImagesData: { imageName: string; imgUrl: string }[] = [];
		let incorrectImagesData: { imageName: string; imgUrl: string }[] = [];

		// set loading
		setUploadingAndSubmitting(true);
		// upload images to firebase storage and block the code until all images are uploaded
		for (let i = 0; i < correctImages.length; i++) {
			const data = await uploadImage(correctImages[i]);
			correctImagesData.push(data);
		}
		for (let i = 0; i < incorrectImages.length; i++) {
			const data = await uploadImage(incorrectImages[i]);
			incorrectImagesData.push(data);
		}

		// dont add data to db until all images are uploaded
		const imageChoiceActivity =
			await addImageChoiceDataMutation.mutateAsync({
				activityName: activtityName,
				correctImagesData: correctImagesData,
				incorrectImagesData: incorrectImagesData,
			});
		// unset loading
		setUploadingAndSubmitting(false);
		console.log("imageChoiceActivity:", imageChoiceActivity);
	};

	const addImageChoiceDataMutation = useMutation({
		mutationKey: ["addImageChoiceData"],
		mutationFn: addImageChoiceData,
		onSuccess: () => {
			toast.success("added data");
			router.replace("/dashboard/imageChoice/list");
		},
	});

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
			<div className="w-full grid grid-cols-2 gap-2">
				{!correctImages && (
					<div className="flex items-center justify-center w-full mb-3">
						<label
							htmlFor="dropzone-file"
							className="flex flex-col items-center justify-center w-full h-64 
							border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
							bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 
							hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 
							dark:hover:bg-gray-600">
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
										Click to upload correct images
									</span>
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									SVG, PNG, JPG or GIF (MAX. 800x400px)
								</p>
							</div>
							<input
								id="dropzone-file"
								type="file"
								className="hidden"
								multiple
								onChange={(e) => {
									const files = e.target.files;
									if (files) {
										setCorrectImages(Array.from(files));
									}
								}}
							/>
						</label>
					</div>
				)}
				{correctImages && (
					<div className="grid grid-cols-3 gap-2 mb-3 bg-gray-300 p-2 rounded">
						{correctImages.map((image, idx) => (
							// render images along a delete button
							<div className="relative" key={idx}>
								<img
									src={URL.createObjectURL(image)}
									alt="image"
									className="w-full rounded-lg"
								/>
								<button
									type="button"
									className="absolute top-0 right-0 text-white bg-red-700 
									hover:bg-red-800 focus:ring-4 focus:outline-none 
									focus:ring-red-300 font-medium rounded-lg text-sm w-8 h-8 text-center 
									dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
									onClick={() => {
										setCorrectImages((prev) => {
											if (prev) {
												const newImages = prev.filter(
													(_, i) => i !== idx
												);
												return newImages.length
													? newImages
													: null;
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

				{!incorrectImages && (
					<div className="flex items-center justify-center w-full mb-3">
						<label
							htmlFor="dropzone-file"
							className="flex flex-col items-center justify-center w-full h-64 
							border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
							bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 
							dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
										Click to upload incorrect images
									</span>
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									SVG, PNG, JPG or GIF (MAX. 800x400px)
								</p>
							</div>
							<input
								id="dropzone-file"
								type="file"
								className="hidden"
								multiple
								onChange={(e) => {
									const files = e.target.files;
									if (files) {
										setIncorrectImages(Array.from(files));
									}
								}}
							/>
						</label>
					</div>
				)}
				{incorrectImages && (
					<div className="grid grid-cols-3 gap-2 mb-3 bg-gray-300 p-2 rounded">
						{incorrectImages.map((image, idx) => (
							// render images along a delete button
							<div className="relative" key={idx}>
								<img
									src={URL.createObjectURL(image)}
									alt="image"
									className="w-full rounded-lg"
								/>
								<button
									type="button"
									className="absolute top-0 right-0 text-white bg-red-700 
									hover:bg-red-800 focus:ring-4 focus:outline-none 
									focus:ring-red-300 font-medium rounded-lg text-sm w-8 h-8 text-center 
									dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
									onClick={() => {
										setIncorrectImages((prev) => {
											if (prev) {
												const newImages = prev.filter(
													(_, i) => i !== idx
												);
												return newImages.length
													? newImages
													: null;
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
				{correctImages && (
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
									setCorrectImages((prev) => {
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
				{incorrectImages && (
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
									setIncorrectImages((prev) => {
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
						setCorrectImages(null);
						setIncorrectImages(null);
						setactivtityName("");
						setUploadingAndSubmitting(false);
					}}
					className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
				focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
				dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
					Reset
				</button>
			</div>
		</form>
	);
};

export default AddImageChoice;
