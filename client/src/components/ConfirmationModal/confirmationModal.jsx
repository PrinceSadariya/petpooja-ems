import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button";

export default function ConfirmationModal({
	isModalOpen,
	onCancel,
	onConfirm,
	children,
	confirmBtnText = "Confirm",
}) {
	const [isLoading, setIsLoading] = useState(false);

	const _onConfirm = useCallback(async () => {
		setIsLoading(true);
		await onConfirm();
		setIsLoading(false);
	}, [onConfirm]);

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur ${
				isModalOpen ? "opacity-100" : "pointer-events-none opacity-0"
			} transition-all ease-in-out`}
		>
			<div className="relative h-[] w-[400px] rounded bg-white p-3">
				<div className="w-fit mx-auto">
					<i className="bx bx-error-circle text-8xl text-red-600"></i>
				</div>

				{children}

				<div className="mt-4 flex space-x-3">
					<Button
						containerClass="mt-0 flex-1"
						text={"Cancel"}
						onClick={onCancel}
					/>
					<Button
						containerClass="mt-0 flex-1"
						text={confirmBtnText}
						color="red-600-outline"
						onClick={_onConfirm}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
}

ConfirmationModal.propTypes = {
	isModalOpen: PropTypes.bool,
	onCancel: PropTypes.func,
	onConfirm: PropTypes.func,
	children: PropTypes.node,
	confirmBtnText: PropTypes.string,
};
