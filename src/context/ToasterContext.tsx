"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

type Props = {};

const ToasterContext = (props: Props) => {
	return (
		<div>
			<Toaster />
		</div>
	);
};

export default ToasterContext;
