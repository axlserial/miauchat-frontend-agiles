import { Navigate, Route, Routes } from "react-router-dom";
import { Container, Flex } from "@mantine/core";
import { base, Rutas } from "./routes";

import ProtectedRoute from "./components/ProtectedRoute";
import { useSessionStore } from "./stores/sessionStore";
import Layout from "./components/Layout";

// Page components
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Registro from "./pages/registro";
import PantallaPrincipal from "./pages/PantallaPrincipal";
import Chats from "./components/Chats";

const App = () => {
	const usuario = useSessionStore((state) => state.usuario);

	return (
		<Routes>
			{/* Ruta raíz */}
			<Route index element={<Navigate to={Rutas.login} />} />

			{/* Ruta base */}
			<Route path={base} element={<Navigate to={Rutas.login} />} />

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
				<Route
					path={Rutas.chats}
					element={
						<Container
							size="95%"
							sx={{ paddingTop: "2%", paddingBottom: "2%" }}
						>
							<PantallaPrincipal />
						</Container>
					}
				>
					<Route path={Rutas.chats + "/:id"} element={<Chats />} />
				</Route>
			</Route>

			{/* Not found */}
			<Route
				path="*"
				element={
					<Flex justify="center" align="center" direction="column">
						<NotFound />
					</Flex>
				}
			/>
		</Routes>
	);
};

export default App;
