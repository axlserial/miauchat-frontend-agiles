import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Rutas } from "./routes";

// Page components
import NotFound from "./pages/NotFound";
import Registro from "./pages/registro";
import { Container } from "@mantine/core";
const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Ruta raíz */}
				<Route index element={<Navigate to={Rutas.login} />} />

				{/* Ruta login */}
				<Route path={Rutas.login} element={<div>Compontente Login</div>} />

				{/* Ruta registro */}
				<Route path={Rutas.signup} element={
							<div
								style={{
									backgroundImage:
										"url(src/assets/images/background_light_miauChat.svg)",
									width: "auto",
									height: "98vh",
								}}
							>
								<Container sx={{ paddingTop: "4%", paddingBottom: "4%" }}>
									<Registro />
								</Container>
							</div>
						} />

				{/* Not found */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
