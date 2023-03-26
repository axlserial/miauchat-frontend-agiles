import { AppShell, Header, ActionIcon, Menu, Button, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useSalaStore } from '../stores/salaStore';
import ChatBody from './ChatBody';
import { IconMenu2 } from '@tabler/icons-react';
import { IconTransferOut, IconEdit, IconTrash } from '@tabler/icons-react';
import { useSessionStore } from '../stores/sessionStore'
function chats() {
	const { height } = useViewportSize();
	const salaActual = useSalaStore(state => state.salaActual);
	const usuario = useSessionStore(state => state.usuario);

	return (
		<AppShell
			// contenido del chat (nombre y codigo de sala y opciones )
			padding="sm"
			header={
				<Header
					height={95}
					style={{
						position: 'sticky',
						top: 0,
						zIndex: 1,
						textAlign: 'center',
						backgroundColor: 'lightblue',
						display: 'flex',
						justifyContent: 'space-between'
					}}
				>
					<div>
						<h2
							style={{
								fontSize: '24px',
								fontWeight: 'bold',
								marginBottom: '5px',
								marginLeft: '60vh'
							}}
						>
							{salaActual.nombre_sala}
						</h2>
						<p
							style={{
								fontSize: '16px',
								color: '#999',
								marginLeft: '60vh'
							}}
						>
							{salaActual.id}
						</p>
					</div>
					<Menu shadow="md" width={200}>
						<Menu.Target>
							<Button>
								<IconMenu2/> 
								
							</Button>
						</Menu.Target>
								
						<Menu.Dropdown>
							{salaActual.creador_id === usuario.id ? (<>
								<Menu.Item icon={<IconTransferOut size={14} />}>
									Abandonar Sala
								</Menu.Item>
								<Menu.Item icon={<IconTrash size={14} />}>
									Eliminar Sala
								</Menu.Item>
								<Menu.Item icon={<IconEdit size={14} />}>Cambiar nombre de Sala</Menu.Item>
							</>) : (<> 
								<Menu.Item icon={<IconTransferOut size={14} />}>
									Abandonar Sala
								</Menu.Item> </>)
							}
							
						</Menu.Dropdown>
					</Menu>
				</Header>
			}
			sx={{ height: height - 120 }}
		>
			<ChatBody sala={salaActual} />
		</AppShell>
	);
}

export default chats;
