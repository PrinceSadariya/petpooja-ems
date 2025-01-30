import React from "react";

import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const FormInput = React.forwardRef(function FormInput(
	{
		type,
		id,
		label,
		labelClass,
		placeholder,
		className = "",
		error,
		containerClass,
		isMandatory,
		...rest
	},
	ref
) {
	return (
		<div className={twMerge("mt-2 w-full", containerClass)}>
			{label && (
				<div>
					<label
						className={
							labelClass +
							` ${
								isMandatory &&
								" after:content-['*'] after:text-red-500"
							}`
						}
						htmlFor={id}
					>
						{label}
					</label>
				</div>
			)}
			<input
				{...rest}
				type={type || "text"}
				id={id}
				className={twMerge(
					`w-full outline-none rounded p-1 border border-gray-700 ${
						!rest?.readOnly &&
						"focus:ring-1 focus:ring-gray-700 focus:border-gray-700"
					}`,
					className
				)}
				placeholder={placeholder}
				ref={ref}
				autoComplete="off"
			/>
			{error && (
				<span className="text-red-600 text-xs before:content-['*'] before:me-1">
					{error.message}
				</span>
			)}
		</div>
	);
});

FormInput.propTypes = {
	type: PropTypes.string,
	id: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	labelClass: PropTypes.string,
	containerClass: PropTypes.string,
	error: PropTypes.object,
	isMandatory: PropTypes.bool,
};

export default FormInput;
