import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import FormCheckbox from "../../components/Form/FormCheckbox/formCheckbox";
import FormInput from "../../components/Form/FormInput/formInput";
import useEmployeeForm from "./useEmployeeForm";
import FormSelect from "../../components/form/FormSelect";
import ImageUpload from "../../components/ImageUpload";

export default function EmployeeForm() {
	const { id } = useParams();

	const {
		register,
		handleEmployeeSubmit,
		errors,
		isSubmitting,
		departmentOption,
		handleImageUpload,
		employee,
	} = useEmployeeForm({ id });

	return (
		<div className="w-full">
			<div className="max-w-2xl mx-auto">
				<h2 className="uppercase font-semibold text-lg">
					{id ? "Employee Edit" : "Employee Add"}
				</h2>
				<div className="mt-5 bg-white rounded p-3">
					<form>
						<ImageUpload
							// label="Employee Photo"
							id="profileImage"
							name="photo"
							onImageUpload={handleImageUpload}
							imageSrc={
								employee.oldPhoto
									? "/" + employee.oldPhoto
									: null
							}
						/>
						<FormInput
							{...register("name", {
								required: "Employee name can not be empty",
							})}
							label="Employee Name"
							id="employeeName"
							placeholder="Enter Employee Name"
							error={errors.name}
							isMandatory
						/>
						<FormSelect
							{...register("departmentId", {
								required: "Please select department",
							})}
							id="department"
							label="Department"
							options={departmentOption}
							error={errors.departmentId}
							isMandatory
						/>
						<FormInput
							{...register("dob", {
								required: "Date of birth cannot be empty",
								validate: {
									maxDate: (value) => {
										const today = new Date()
											.toISOString()
											.split("T")[0];
										if (value > today) {
											return "Date of birth cannot be in the future";
										}
										return true;
									},
								},
							})}
							type="date"
							max={new Date().toISOString().split("T")[0]}
							label="Date of Birth"
							id="dob"
							placeholder="Enter Date of Birth"
							error={errors.dob}
							isMandatory
						/>
						<FormInput
							{...register("phone", {
								required: "Phone number is required",
								pattern: {
									value: /^[6789]\d{9}$/,
									message:
										"Phone number must be a valid phone",
								},
							})}
							label="Phone"
							id="phone"
							placeholder="Enter Phone"
							error={errors.phone}
							isMandatory
						/>
						<FormInput
							{...register("email", {
								required: "Email cannot be empty",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // Email regex
									message: "Enter a valid email address",
								},
							})}
							label="Email"
							id="email"
							placeholder="Enter Email"
							error={errors.email}
							isMandatory
						/>
						<FormInput
							{...register("salary", {
								required: "Salary cannot be empty",
								pattern: {
									value: /^[1-9]\d*$/,
									message: "Salary must be a valid number",
								},
							})}
							label="Salary"
							id="salary"
							placeholder="Enter Salary"
							error={errors.salary}
							isMandatory
						/>
						<FormCheckbox
							{...register("status")}
							label={"Active"}
							id="departmentStatus"
						/>
						<Button
							text={"Save"}
							onClick={handleEmployeeSubmit}
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
