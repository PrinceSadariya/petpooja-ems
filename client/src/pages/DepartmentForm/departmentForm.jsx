import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import FormCheckbox from "../../components/Form/FormCheckbox/formCheckbox";
import FormInput from "../../components/Form/FormInput/formInput";
import useDepartmentForm from "./useDepartmentForm";

export default function DepartmentForm() {
	const { id } = useParams();

	const { register, handleDepartmentSubmit, errors, isSubmitting } =
		useDepartmentForm({ id });
	return (
		<div className="w-full">
			<div className="max-w-2xl mx-auto">
				<h2 className="uppercase font-semibold text-lg">
					{id ? "Department Edit" : "Department Add"}
				</h2>
				<div className="mt-5 bg-white rounded p-3">
					<form>
						<FormInput
							{...register("name", {
								required: "Department name can not be empty",
							})}
							label="Department Name"
							id="departmentName"
							placeholder="Enter Department Name"
							error={errors.name}
							isMandatory
						/>
						<FormCheckbox
							{...register("status")}
							label={"Active"}
							id="departmentStatus"
						/>
						<Button
							text={"Save"}
							onClick={handleDepartmentSubmit}
							color="red-600"
							className={"mx-auto w-fit"}
							containerClass={"mt-5"}
							isLoading={isSubmitting}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}
