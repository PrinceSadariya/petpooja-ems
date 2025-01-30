const baseUrl = "http://localhost:5000";

const urls = {
	departmentGet: () => `${baseUrl}/department/get`,
	departmentGetAllActive: () => `${baseUrl}/department/all`,
	departmentGetById: (id) => `${baseUrl}/department/get/${id}`,
	departmentAdd: () => `${baseUrl}/department/add`,
	departmentUpdate: () => `${baseUrl}/department/update`,
	departmentDeleteById: (id) => `${baseUrl}/department/delete/${id}`,

	employeeGet: () => `${baseUrl}/employee/get`,
	employeeGetById: (id) => `${baseUrl}/employee/get/${id}`,
	employeeAdd: () => `${baseUrl}/employee/add`,
	employeeUpdate: () => `${baseUrl}/employee/update`,
	employeeDeleteById: (id) => `${baseUrl}/employee/delete/${id}`,

	statsDepartmentWiseMaxSalary: () =>
		`${baseUrl}/stats/department-wise-max-salary`,
	statsSalaryRangeWiseCount: () => `${baseUrl}/stats/salary-range-wise-count`,
	statsDepartmentWiseYoungestEmployee: () =>
		`${baseUrl}/stats/department-wise-youngest-employee`,
};

export default urls;
