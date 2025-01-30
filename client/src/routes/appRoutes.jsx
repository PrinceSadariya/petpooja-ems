import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layout/MainLayout";
import DepartmentList from "../pages/DepartmentList";
import DepartmentForm from "../pages/DepartmentForm";
import EmployeeList from "../pages/EmployeeList";
import EmployeeForm from "../pages/EmployeeForm/employeeForm";

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Dashboard />} />

					{/* department routes */}
					<Route path="department" element={<DepartmentList />} />
					<Route path="department/add" element={<DepartmentForm />} />
					<Route
						path="department/edit/:id"
						element={<DepartmentForm />}
					/>

					{/* employee routes */}
					<Route path="employee" element={<EmployeeList />} />
					<Route path="employee/add" element={<EmployeeForm />} />
					<Route
						path="employee/edit/:id"
						element={<EmployeeForm />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
