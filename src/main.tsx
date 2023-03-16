import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<MantineProvider withNormalizeCSS withGlobalStyles>
		<Notifications />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</MantineProvider>
);
