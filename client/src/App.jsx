import AppRoutes from "./routes/appRoutes";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
	return (
		<>
			<AppRoutes />
			<ToastContainer
				position="bottom-right"
				autoClose={2000}
				theme="colored"
			/>
		</>
	);
}

export default App;
