import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "@mantine/core";
import { Rutas } from "./routes";

import ProtectedRoute from "./components/ProtectedRoute";
import { useSessionStore } from "./stores/sessionStore";
import Layout from "./components/Layout";

// Page components
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Registro from "./pages/registro";

const App = () => {
	const usuario = useSessionStore((state) => state.usuario);

	return (
		<Routes>
			{/* Ruta raíz */}
			<Route index element={<Navigate to={Rutas.login} />} />

			{/* Ruta login */}
			<Route
				path={Rutas.login}
				element={
					<Container sx={{ paddingTop: "4%", paddingBottom: "4%" }}>
						<Login />
					</Container>
				}
			/>

			{/* Ruta registro */}
			<Route
				path={Rutas.signup}
				element={
					<Container sx={{ paddingTop: "4%", paddingBottom: "4%" }}>
						<Registro />
					</Container>
				}
			/>

			{/* Ruta chats, protegida */}
			<Route element={<ProtectedRoute isAuth={usuario.id !== 0} />}>
				<Route path="/" element={<Layout />}>
					<Route path={Rutas.chats} element={<div>Compontente chats</div>} />
				</Route>
			</Route>

			{/* Not found */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
