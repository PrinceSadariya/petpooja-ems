import { useCallback, useState } from "react";

import PropTypes from "prop-types";
import debounce from "lodash/debounce";

import { twMerge } from "tailwind-merge";

export default function SearchInput({ fetchData, dataFilter, className }) {
	const [searchQuery, setSearchQuery] = useState("");

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const _searchDebounced = useCallback(
		debounce((search) => {
			fetchData({ ...dataFilter, search, currentPage: 1 });
		}, 600),
		[dataFilter]
	);

	const onSearch = useCallback(
		(e) => {
			setSearchQuery(e.target.value);
			_searchDebounced(e.target.value);
		},
		[_searchDebounced]
	);

	return (
		<div className="relative">
			<input
				type="text"
				className={twMerge(
					"w-80 rounded bg-gray-200 py-2 pl-7 pr-1",
					className
				)}
				placeholder="Search here"
				value={searchQuery}
				onChange={onSearch}
			/>
			<span className="absolute left-1 top-1/2 w-5 -translate-y-1/2 text-gray-700">
				<i className="bx bx-search-alt-2 text-xl"></i>
			</span>
		</div>
	);
}

SearchInput.propTypes = {
	fetchData: PropTypes.func,
	dataFilter: PropTypes.object,
	className: PropTypes.string,
};
