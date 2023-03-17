import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import App from "./App";

import bg from "./assets/images/background_light_miauChat.svg";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<MantineProvider withNormalizeCSS withGlobalStyles>
		<div
			style={{
				backgroundImage: "url(" + bg + ")",
				width: "auto",
				height: "98vh",
			}}
		>
			<Notifications />
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</div>
	</MantineProvider>
);
