import ConfirmationModal from "../../components/ConfirmationModal/confirmationModal";
import DataTable from "../../components/DataTable/dataTable";

import useDepartmentList from "./useDepartmentList";

export default function DepartmentList() {
	const {
		departmentData,
		dataFilter,
		paginationDetails,
		fetchDepartments,
		isLoading,
		redirectToAddDepartment,
		redirectToEditDepartment,
		openDeleteModal,
		onConfirmDelete,
		isDeleteModalOpen,
		closeDeleteModal,
	} = useDepartmentList();

	return (
		<>
			<div className="w-full">
				<DataTable
					tableData={departmentData}
					paginationDetails={paginationDetails}
					dataFilter={dataFilter}
					fetchData={fetchDepartments}
					tableColumns={{ name: "Department" }}
					primaryKey="id"
					onAdd={redirectToAddDepartment}
					onEdit={redirectToEditDepartment}
					onDelete={openDeleteModal}
					isLoading={isLoading}
					btnText={"Add Department"}
				/>
			</div>
			<ConfirmationModal
				isModalOpen={isDeleteModalOpen}
				onCancel={closeDeleteModal}
				onConfirm={onConfirmDelete}
			>
				<div className="text-center">
					<p>Are you sure? You want to delete a department</p>
					<p>
						Employees which are in this department will also be
						deleted
					</p>
				</div>
			</ConfirmationModal>
		</>
	);
}
