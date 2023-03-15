import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Rutas } from "./routes";

// Page components
import NotFound from "./pages/NotFound";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Ruta raíz */}
				<Route index element={<Navigate to={Rutas.login} />} />

				{/* Ruta login */}
				<Route path={Rutas.login} element={<div>Compontente Login</div>} />

				{/* Ruta registro */}
				<Route path={Rutas.signup} element={<div>Compontente Registro</div>} />

				{/* Not found */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
