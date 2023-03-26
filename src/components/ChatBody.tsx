import {
	Notification,
	Center,
	Stack,
	ScrollArea,
	Textarea,
	ActionIcon,
	Group
} from '@mantine/core';
import { useEffect, useState, useRef } from 'react';
import { IconMessage, IconSend } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useSocketStore } from '../stores/socket.store';
import { useSessionStore } from '../stores/sessionStore';
import { getMensajes } from '../services/mensajes';
import { Sala, Mensaje_sala } from '../types';

import ChatMessage from './ChatMessage';

type ChatBodyProps = {
	sala: Sala;
};

const ChatBody = ({ sala }: ChatBodyProps) => {
	const usuario = useSessionStore(state => state.usuario);
	const socket = useSocketStore(state => state.socket);
	const [mensajes, setMensajes] = useState<Mensaje_sala[]>([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setLoading(true);
		getMensajes(sala.id)
			.then(data => {
				setMensajes(data);
			})
			.catch(_ => {
				setError(true);
				notifications.show({
					title: 'Error',
					color: 'red',
					message: 'Error al cargar los mensajes'
				});
			})
			.finally(() => setLoading(false));
	}, [sala]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({
			block: 'end'
		});
	}, [mensajes]);

	if (loading) {
		return (
			<Center>
				<Notification
					loading
					withCloseButton={false}
					radius="xl"
					sx={{ width: '200px' }}
				>
					Cargando chat...
				</Notification>
			</Center>
		);
	}

	if (error) {
		return <div>Error</div>;
	}

	return (
		<Stack
			sx={{
				height: '92%',
				position: 'relative',
				zIndex: 1,
				top: -60
			}}
		>
			<ScrollArea p="lg" scrollbarSize={10} sx={{ height: '74vh' }}>
				<Stack>
					{mensajes.map(mensaje => (
						<ChatMessage
							key={mensaje.mensaje.id}
							mensaje={mensaje}
							esPropio={usuario.id === mensaje.mensaje.emisor_id}
						/>
					))}
				</Stack>
				<div ref={scrollRef} style={{ height: '1px' }} />
			</ScrollArea>
			<Group>
				<Textarea
					icon={<IconMessage />}
					variant="filled"
					autosize
					minRows={1}
					maxRows={3}
					placeholder="Envía un mensaje"
					sx={{ width: '80%', marginLeft: '6vh' }}
				/>
				<ActionIcon variant="filled" color="blue" radius="md" size="xl" w={60}>
					<IconSend />
				</ActionIcon>
			</Group>
		</Stack>
	);
};

export default ChatBody;
