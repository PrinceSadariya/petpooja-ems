import React from "react";

import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const FormCheckbox = React.forwardRef(function FormCheckbox(
	{ id, label, labelClass, className = "", error, containerClass, ...rest },
	ref
) {
	return (
		<div className={twMerge("flex items-center mt-3", containerClass)}>
			<input
				{...rest}
				type="checkbox"
				id={id}
				className={twMerge(
					"accent-gray-700 aspect-square cursor-pointer w-4 disabled:cursor-not-allowed",
					className
				)}
				ref={ref}
			/>
			{label && (
				<label
					className={twMerge("ms-2 leading-none", labelClass)}
					htmlFor={id}
				>
					{label}
				</label>
			)}
			{error && (
				<span className="text-red-600 text-[calc(1em-2px)] before:content-['*'] before:me-1 whitespace-nowrap">
					{error.message}
				</span>
			)}
		</div>
	);
});

FormCheckbox.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	className: PropTypes.string,
	labelClass: PropTypes.string,
	containerClass: PropTypes.string,
	error: PropTypes.object,
};

export default FormCheckbox;
