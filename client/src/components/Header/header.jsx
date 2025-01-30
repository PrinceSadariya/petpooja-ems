import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header({ isOpen, toggleSidebar }) {
	return (
		<div
			className={`fixed top-0 left-0 right-0 bg-white flex z-50 h-20 items-center`}
		>
			{/* space for sidebar */}
			{isOpen && (
				<div className="w-[250px] h-20 p-2 bg-gray-800 flex items-center justify-center"></div>
			)}
			<div className="flex flex-1 px-4 bg-white border-b shadow items-center h-full">
				<button
					onClick={toggleSidebar}
					className="py-1 px-2 rounded-full hover:bg-gray-100 focus:outline-none"
				>
					<i className="bx bx-menu text-2xl"></i>
				</button>
				<Link to={"/"}>
					<span className="block h-fit bg-red-600 p-2 ms-2 text-xl font-bold rounded text-white font-mono uppercase px-4">
						Petpooja EMS
					</span>
				</Link>
			</div>
		</div>
	);
}

Header.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	toggleSidebar: PropTypes.func.isRequired,
};
