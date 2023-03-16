import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "@mantine/core";
import { Rutas } from "./routes";

// Page components
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App = () => {
	return (
		<Routes>
			{/* Ruta raíz */}
			<Route index element={<Navigate to={Rutas.login} />} />

			{/* Ruta login */}
			<Route
				path={Rutas.login}
				element={
					<div
						style={{
							backgroundImage:
								"url(src/assets/images/background_light_miauChat.svg)",
							width: "auto",
							height: "98vh",
						}}
					>
						<Container sx={{ paddingTop: "4%", paddingBottom: "4%" }}>
							<Login />
						</Container>
					</div>
				}
			/>

			{/* Ruta registro */}
			<Route path={Rutas.signup} element={<div>Compontente Registro</div>} />

			{/* Ruta chats */}
			<Route path={Rutas.chats} element={<div>Compontente chats</div>} />

			{/* Not found */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
