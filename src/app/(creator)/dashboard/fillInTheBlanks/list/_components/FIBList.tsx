"use client";
import axios from "axios";
import { get } from "http";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const FIBList = (props: Props) => {
	const [fibData, setfibData] = useState([]);

	const getFIBData = async () => {
		const res = await axios.get("/api/getAllFIBData");
		const data = res.data;
		console.log("data", data);
		setfibData(data);
	};

	useEffect(() => {
		getFIBData();
	}, []);

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
						{fibData?.map((data: any, index) => {
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
											href={`/dashboard/fillInTheBlanks/edit/${data._id}`}>
											Edit
										</Link>
									</td>
									<td className="px-6 py-4">
										<div
											className="w-full h-full cursor-pointer"
											onClick={
												async () => {
													await axios.delete(
														`/api/deleteFIBActivity`,
														{
															data: {
																id: data.id,
															},
														}
													);
													getFIBData();
												}
												// update the fibData state
											}
											// href={`/dashboard/fillInTheBlanks/delete/${data._id}`}
										>
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
