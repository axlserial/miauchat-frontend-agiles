import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { MantineProvider, Loader } from "@mantine/core";
import App from "./App";

import { useSessionStore } from "./stores/sessionStore";

import bg from "./assets/images/background_light_miauChat.svg";

export const Main = () => {
	const fetchUsuario = useSessionStore((state) => state.fetchUsuario);
	const [loading, setLoading] = useState(true);

	// Obtiene el usuario de la sesión
	useEffect(() => {
		(async () => {
			await fetchUsuario(setLoading);
		})();
	}, [fetchUsuario]);

	return (
		<MantineProvider withNormalizeCSS withGlobalStyles>
			<Notifications />
			<div
				style={{
					backgroundImage: `url("${bg}")`,
					width: "auto",
					height: "98vh",
				}}
			>
				{loading ? (
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						<Loader size="lg" />
					</div>
				) : (
					<BrowserRouter>
						<App />
					</BrowserRouter>
				)}
			</div>
		</MantineProvider>
	);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Main />
);
