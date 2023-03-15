import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Rutas } from "./routes";
import Login from "./pages/Login";

// Page components
import NotFound from "./pages/NotFound";
import { Container } from "@mantine/core";

const App = () => {
	return (
		<MantineProvider withNormalizeCSS withGlobalStyles>
			<Notifications />
			<BrowserRouter>
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
					<Route
						path={Rutas.signup}
						element={<div>Compontente Registro</div>}
					/>

					{/* Ruta chats */}
					<Route path={Rutas.chats} element={<div>Compontente chats</div>} />

					{/* Not found */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	);
};

export default App;
