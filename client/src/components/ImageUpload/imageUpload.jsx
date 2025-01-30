import React, {
	useState,
	useRef,
	useMemo,
	useCallback,
	useEffect,
} from "react";
import PropTypes from "prop-types";

const ImageUpload = ({ label, uniqueId, onImageUpload, imageSrc = "" }) => {
	const [image, setImage] = useState(null);

	useEffect(() => {
		setImage(imageSrc);
	}, [imageSrc]);

	const fileInputRef = useRef(null);

	const handleImageUpload = useCallback(
		(e) => {
			const file = e.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					setImage(e.target.result);
					onImageUpload(file);
				};
				reader.readAsDataURL(file);
			}
		},
		[onImageUpload]
	);

	const handleRemoveImage = useCallback(() => {
		setImage(null);
		onImageUpload(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	}, [onImageUpload]);

	const renderEmptyBlock = useMemo(() => {
		return (
			<div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center">
				<i className="bx bxs-user text-5xl text-gray-400"></i>
				<label
					htmlFor="image-upload"
					className="absolute bottom-0 right-0 bg-white p-2 rounded-full w-8 h-8 cursor-pointer shadow-md  items-center justify-center flex"
				>
					<i className="bx bxs-camera text-md text-gray-600"></i>
				</label>
				<input
					id="image-upload"
					type="file"
					accept="image/*"
					onChange={handleImageUpload}
					className="hidden"
					ref={fileInputRef}
				/>
			</div>
		);
	}, [handleImageUpload]);

	const renderFileUpload = useMemo(() => {
		return (
			<div className="w-32 h-32 rounded-full relative">
				<div className="w-full h-full rounded-full overflow-hidden">
					<img
						src={image}
						alt="Uploaded"
						className="w-full h-full object-cover"
					/>
				</div>
				<button
					onClick={handleRemoveImage}
					className="absolute bottom-0 right-0 bg-red-500 p-2 w-8 h-8 rounded-full cursor-pointer shadow-md  items-center justify-center flex"
					aria-label="Remove image"
				>
					<i className="bx bx-x text-md text-white"></i>
				</button>
			</div>
		);
	}, [image, handleRemoveImage]);

	return (
		<div className="">
			{label && (
				<label htmlFor={uniqueId} className="">
					{label}
				</label>
			)}

			<div className="mx-auto relative w-36 h-36 flex items-center justify-center">
				{image ? renderFileUpload : renderEmptyBlock}
			</div>
		</div>
	);
};

ImageUpload.propTypes = {
	label: PropTypes.string,
	uniqueId: PropTypes.string,
	onImageUpload: PropTypes.func.isRequired,
	imageSrc: PropTypes.string,
};

export default React.memo(ImageUpload);
