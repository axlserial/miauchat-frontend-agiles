import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "@mantine/core";
import { Rutas } from "./routes";
import bg from "./assets/images/background_light_miauChat.svg";

// Page components
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Registro from "./pages/registro";

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
							backgroundImage: "url(" + bg + ")",
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
					<Route
						path={Rutas.signup}
						element={
							<div
								style={{
									backgroundImage: "url(" + bg + ")",
									width: "auto",
									height: "98vh",
								}}
							>
								<Container sx={{ paddingTop: "4%", paddingBottom: "4%" }}>
									<Registro />
								</Container>
							</div>
						}
					/>

					{/* Ruta chats */}
					<Route path={Rutas.chats} element={<div>Compontente chats</div>} />

			{/* Not found */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
