import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	className?: string;
};

const TextInput = ({ className, ...props }: Props) => {
	return (
		<input
			{...props}
			className={`bg-gray-50 border border-gray-300 text-gray-200 text-sm rounded-lg 
			focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
			dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
			dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
		/>
	);
};

export default TextInput;
