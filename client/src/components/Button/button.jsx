import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const _colors = {
	"red-600": "bg-red-600 text-white border-red-600 ring-red-600",
	"red-600-outline":
		"bg-tranparent text-red-600 border-red-600 ring-red-600 enabled:hover:bg-red-600 enabled:hover:text-white",
};

export default function Button({
	type,
	text,
	className,
	onClick,
	disabled = false,
	containerClass,
	isLoading = false,
	color = "red-600",
}) {
	return (
		<div className={twMerge("mt-3", containerClass)}>
			<button
				type={type || "button"}
				onClick={onClick}
				className={twMerge(
					`relative capitalize font-semibold flex justify-center items-center border leading-none rounded w-full outline-none p-1.5 px-4 transition-all duration-300 ease-in-out enabled:focus-visible:ring-4 ring-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed ${_colors[color]}`,
					className
				)}
				disabled={disabled || isLoading} // Disable button when loading
			>
				{isLoading && (
					<div className="absolute inset-0 flex justify-center items-center">
						<i className="bx bxs-doughnut-chart bx-spin"></i>
					</div>
				)}
				<span
					className={`block ${isLoading ? "invisible" : "visible"}`}
				>
					{text}
				</span>
			</button>
		</div>
	);
}

Button.propTypes = {
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	type: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func,
	containerClass: PropTypes.string,
	disabled: PropTypes.bool,
	isLoading: PropTypes.bool,
	color: PropTypes.string,
};
