import React from "react";

import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const FormSelect = React.forwardRef(function FormSelect(
	{
		label,
		id,
		options,
		error,
		className,
		labelClass,
		containerClass,
		isMandatory,
		...rest
	},
	ref
) {
	return (
		<div className={twMerge("w-full mt-2", containerClass)}>
			{label && (
				<div>
					<label
						className={twMerge(
							`${
								isMandatory &&
								" after:content-['*'] after:text-red-500"
							}`,
							labelClass
						)}
						htmlFor={id}
					>
						{label}
					</label>
				</div>
			)}
			<select
				{...rest}
				id={id}
				ref={ref}
				className={twMerge(
					"w-full bg-white outline-none rounded p-1 px-0 input-number-arrow-none border border-gray-600/70 focus:ring-1 focus:ring-gray-700 focus:border-gray-700",
					className
				)}
			>
				{options.map((opt) => {
					return (
						<option
							key={opt.id}
							value={opt.value}
							className=""
							disabled={
								rest.defaultValue !== undefined &&
								opt.value === rest.defaultValue
							}
						>
							{opt.label}
						</option>
					);
				})}
			</select>
			{error && (
				<span className="text-red-600 text-xs before:content-['*'] before:me-1 whitespace-nowrap">
					{error.message}
				</span>
			)}
		</div>
	);
});

export default FormSelect;

FormSelect.propTypes = {
	label: PropTypes.string,
	labelClass: PropTypes.string,
	containerClass: PropTypes.string,
	className: PropTypes.string,
	id: PropTypes.string,
	options: PropTypes.array.isRequired,
	error: PropTypes.object,
	isMandatory: PropTypes.bool,
};
