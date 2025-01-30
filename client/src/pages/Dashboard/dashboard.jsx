import BarChart from "../../components/BarChart";
import DepartmentYoungEmployee from "../../components/DepartmentYoungEmployee";
import useDashboard from "./useDashboard";

export default function Dashboard() {
	const {
		departmentWiseMaxSalary,
		salaryRangeWiseCount,
		departmentWiseYoungestEmployee,
	} = useDashboard();
	return (
		<div className="w-full">
			<div className="flex justify-evenly flex-1 md:flex-row">
				<div className="flex-1 max-w-xl">
					<BarChart
						labels={departmentWiseMaxSalary.map((dp) => dp.name)}
						chartTitle={"Department Wise Highest Salary"}
						dataset={{
							label: "Highest Salary",
							data: departmentWiseMaxSalary.map(
								(dp) => dp.highestSalary
							),
						}}
					/>
				</div>
				<div className="flex-1 max-w-xl">
					<BarChart
						labels={salaryRangeWiseCount.map(
							(sc) => sc.salaryRange
						)}
						chartTitle={"Salary Range Wise Employee Count"}
						dataset={{
							label: "Employee Count",
							data: salaryRangeWiseCount.map(
								(sc) => sc.employeeCount
							),
						}}
						stepSize={2}
					/>
				</div>
			</div>
			<div className="max-w-3xl mx-auto mt-10">
				<DepartmentYoungEmployee
					data={departmentWiseYoungestEmployee}
				/>
			</div>
		</div>
	);
}
