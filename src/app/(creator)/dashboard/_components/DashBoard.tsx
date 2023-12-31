import Link from "next/link";
import React from "react";

type Props = {};

const DashBoard = (props: Props) => {
	return (
		<div className="p-5">
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead
						className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 
                        dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Product name
							</th>
							<th scope="col" className="px-6 py-3">
								Create
							</th>
							<th scope="col" className="px-6 py-3">
								List
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
                                dark:text-white">
								Fill In The Blanks
							</th>
							<td className="px-6 py-4">
								<Link
									className="w-full h-full"
									href={`/dashboard/fillInTheBlanks/create`}>
									Create
								</Link>
							</td>
							<td className="px-6 py-4">
								<Link
									className="w-full h-full"
									href={`/dashboard/fillInTheBlanks/list`}>
									List
								</Link>
							</td>
						</tr>
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
                                dark:text-white">
								Multiple Choice Questions
							</th>
							<td className="px-6 py-4">
								<Link
									className="w-full h-full"
									href={`/dashboard/mcq/create`}>
									Create
								</Link>
							</td>
							<td className="px-6 py-4">
								<Link
									className="w-full h-full"
									href={`/dashboard/mcq/list`}>
									List
								</Link>
							</td>
						</tr>
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
                                dark:text-white">
								FlashCards
							</th>
							<td className="px-6 py-4">
								<Link
									className="w-full h-full"
									href={`/dashboard/flashCards/create`}>
									Create
								</Link>
							</td>
							<td className="px-6 py-4">
								<Link
									className="w-full h-full"
									href={`/dashboard/flashCards/list`}>
									List
								</Link>
							</td>
						</tr>
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
                                dark:text-white">
								Image Choice
							</th>
							<td className="px-6 py-4">
								<Link
									className="w-full h-full"
									href={`/dashboard/imageChoice/create`}>
									Create
								</Link>
							</td>
							<td className="px-6 py-4">
								<Link
									className="w-full h-full"
									href={`/dashboard/imageChoice/list`}>
									List
								</Link>
							</td>
						</tr>
						<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 
                                dark:text-white">
								Drag And Drop
							</th>
							<td className="px-6 py-4">
								<Link
									className="w-full h-full"
									href={`/dashboard/dragAndDrop/create`}>
									Create
								</Link>
							</td>
							<td className="px-6 py-4">
								<Link
									className="w-full h-full"
									href={`/dashboard/dragAndDrop/list`}>
									List
								</Link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DashBoard;
