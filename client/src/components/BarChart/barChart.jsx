import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
} from "chart.js";
import { memo } from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function BarChart({ labels = [], chartTitle, dataset, stepSize = null }) {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: chartTitle || "Bar Chart",
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: stepSize,
					callback: function (value) {
						return value;
					},
				},
			},
		},
	};

	const data = {
		labels,
		datasets: [
			{
				label: dataset.label || "Label",
				data: dataset.data || [],
				backgroundColor:
					dataset.backgroundColor || "rgba(255, 99, 132, 0.7)",
			},
		],
	};

	return (
		<div className="w-full relative bg-white border border-black p-1 rounded shadow">
			<Bar options={options} data={data} />
		</div>
	);
}

export default memo(BarChart);

BarChart.propTypes = {
	labels: PropTypes.arrayOf(PropTypes.string).isRequired,
	chartTitle: PropTypes.string,
	stepSize: PropTypes.number,
	dataset: PropTypes.shape({
		label: PropTypes.string,
		data: PropTypes.arrayOf(PropTypes.number).isRequired,
		backgroundColor: PropTypes.string,
	}).isRequired,
};
