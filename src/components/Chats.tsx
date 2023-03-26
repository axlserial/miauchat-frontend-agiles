import { AppShell, Header } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useSalaStore } from "../stores/salaStore";
import ChatBody from "./ChatBody";

function chats() {
	const { height } = useViewportSize();
	const salaActual = useSalaStore((state) => state.salaActual);

	return (
		<AppShell
			// contenido del chat (nombre y codigo de sala y opciones )
			padding="sm"
			header={
				<Header height={60} style={{ position: "sticky", top: 0, zIndex: 1 }}>
					<div>header</div>
				</Header>
			}
			sx={{ height: height - 120 }}
		>
			<ChatBody sala={salaActual} />
		</AppShell>
	);
}

export default chats;
