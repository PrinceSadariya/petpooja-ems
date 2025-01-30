import { useEffect, useState } from "react";
import { showApiError } from "../../utils/app.utils";
import Api from "../../utils/api.utils";
import urls from "../../utils/urls.utils";

export default function useDashboard() {
	const [departmentWiseMaxSalary, setDepartmentWiseMaxSalary] = useState([]);
	const [salaryRangeWiseCount, setSalaryRangeWiseCount] = useState([]);
	const [departmentWiseYoungestEmployee, setDepartmentWiseYoungestEmployee] =
		useState([]);

	useEffect(() => {
		const fetchDepartmentWiseMaxSalary = async () => {
			try {
				const { data: resData } = await Api.get({
					url: urls.statsDepartmentWiseMaxSalary(),
				});
				setDepartmentWiseMaxSalary(resData?.data || []);
			} catch (error) {
				showApiError(error);
			}
		};
		const fetchSalaryRangeWiseCount = async () => {
			try {
				const { data: resData } = await Api.get({
					url: urls.statsSalaryRangeWiseCount(),
				});
				setSalaryRangeWiseCount(resData?.data || []);
			} catch (error) {
				showApiError(error);
			}
		};
		const fetchDepartmentWiseYoungestEmployee = async () => {
			try {
				const { data: resData } = await Api.get({
					url: urls.statsDepartmentWiseYoungestEmployee(),
				});
				setDepartmentWiseYoungestEmployee(resData?.data || []);
			} catch (error) {
				showApiError(error);
			}
		};

		fetchDepartmentWiseMaxSalary();
		fetchSalaryRangeWiseCount();
		fetchDepartmentWiseYoungestEmployee();
	}, []);

	return {
		departmentWiseMaxSalary,
		salaryRangeWiseCount,
		departmentWiseYoungestEmployee,
	};
}
