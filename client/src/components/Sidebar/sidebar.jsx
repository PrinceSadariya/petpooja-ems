import { Link } from "react-router-dom";

export default function Sidebar() {
	return (
		<div className="space-y-1">
			<Link
				to={"/"}
				className="text-white px-4 py-1 w-full flex items-center space-x-2"
			>
				<i className="bx bxs-pie-chart-alt-2 text-2xl"></i>
				<span className="block">Dashboard</span>
			</Link>
			<Link
				to={"/department"}
				className="text-white px-4 py-2 w-full flex items-center space-x-2"
			>
				<i className="bx bx-border-all text-2xl"></i>
				<span className="block">Department</span>
			</Link>
			<Link
				to={"/employee"}
				className="text-white px-4 py-2 w-full flex items-center space-x-2"
			>
				<i className="bx bxs-user text-2xl"></i>
				<span className="block">Employee</span>
			</Link>
		</div>
	);
}
