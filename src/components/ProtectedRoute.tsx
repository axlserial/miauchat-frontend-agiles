import { Navigate, Outlet } from "react-router-dom";

import { Rutas } from "../routes";

type props = {
	isAuth: boolean; // Indica si el usuario está autenticado
	children?: JSX.Element; // Componente hijo
	redirectTo?: string; // Ruta a la que redirigir si no está autenticado
};

// Componente que protege las rutas que requieren autenticación
const ProtectedRoute = ({ isAuth, children, redirectTo }: props) => {
	// Si no está autenticado, redirige a la ruta de login
	if (!isAuth) {
		return <Navigate to={redirectTo ? redirectTo : Rutas.login} />;
	}

	// Si está autenticado, muestra el componente hijo
	return children ? children : <Outlet />;
};

export default ProtectedRoute;
