import ConfirmationModal from "../../components/ConfirmationModal/confirmationModal";
import DataTable from "../../components/DataTable/dataTable";

import useEmployeeList from "./useEmployeeList";

export default function EmployeeList() {
	const {
		employeeData,
		dataFilter,
		paginationDetails,
		fetchEmployees,
		isLoading,
		redirectToAddEmployee,
		redirectToEditEmployee,
		openDeleteModal,
		onConfirmDelete,
		isDeleteModalOpen,
		closeDeleteModal,
	} = useEmployeeList();

	return (
		<>
			<div className="w-full">
				<DataTable
					tableData={employeeData}
					paginationDetails={paginationDetails}
					dataFilter={dataFilter}
					fetchData={fetchEmployees}
					tableColumns={{
						name: "Name",
						departmentName: "Department",
						email: "Email",
						salary: "Salary",
					}}
					primaryKey="id"
					onAdd={redirectToAddEmployee}
					onEdit={redirectToEditEmployee}
					onDelete={openDeleteModal}
					isLoading={isLoading}
					btnText={"Add Employee"}
				/>
			</div>
			<ConfirmationModal
				isModalOpen={isDeleteModalOpen}
				onCancel={closeDeleteModal}
				onConfirm={onConfirmDelete}
			>
				<div className="text-center">
					<p>Are you sure? You want to delete an employee</p>
				</div>
			</ConfirmationModal>
		</>
	);
}
