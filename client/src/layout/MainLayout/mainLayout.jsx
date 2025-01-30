import { useCallback, useState } from "react";

import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

/**
 * Wrapper component that renders sidebar and header
 *
 * Parent
 *
 */
const MainLayout = () => {
	const [open, setOpen] = useState(false);

	const handleSidebarToggle = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	return (
		<div className="">
			<Header isOpen={open} toggleSidebar={handleSidebarToggle} />
			{/* p-20 because height of header */}
			<div className="flex pt-20 min-h-screen">
				<div className={`${open ? "w-[250px]" : "w-0"} bg-gray-800`}>
					<Sidebar />
				</div>
				<main className="flex flex-1 p-5 bg-gray-200">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
