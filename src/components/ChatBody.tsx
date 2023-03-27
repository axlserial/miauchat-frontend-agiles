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
import { useParams } from 'react-router-dom';

import { useSocketStore } from '../stores/socket.store';
import { useSessionStore } from '../stores/sessionStore';
import { getMensajes } from '../services/mensajes';
import { Sala, Mensaje_sala, DataSend } from '../types';
import ChatMessage from './ChatMessage';

type ChatBodyProps = {
	sala: Sala;
};

const ChatBody = ({ sala }: ChatBodyProps) => {
	const { id } = useParams();

	const usuario = useSessionStore(state => state.usuario);
	const [mensajes, setMensajes] = useState<Mensaje_sala[]>([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const scrollRef = useRef<HTMLDivElement>(null);

	const socket = useSocketStore(state => state.socket);

	socket?.on('message-receive', (data: Mensaje_sala) => {
		if (!id || id !== sala.id) return;

		if (data.mensaje.sala_id === sala.id) {
			setMensajes([...mensajes, data]);
		}
	});

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

	const [contenido, setContenido] = useState('');
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		if (contenido.trim() === '') {
			return;
		}

		const data: DataSend = {
			mensajeData: {
				contenido: contenido,
				usuario: usuario.usuario,
				emisor_id: usuario.id,
				fecha_enviado:
					new Date().toLocaleDateString('en-CA', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric'
					}) +
					' ' +
					new Date().toLocaleTimeString(),
				sala_id: sala.id,
				es_adjunto: 0
			}
		};

		socket?.emit('message-send', data, (newMsj: Mensaje_sala) => {
			setContenido('');
			setMensajes([...mensajes, newMsj]);
		});
	};

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
				top: -100,
				left: 10
			}}
		>
			<ScrollArea
				p="lg"
				scrollbarSize={10}
				sx={{ height: '70vh', width: '120vh', left: 24 }}
			>
				<Stack sx={{ width: '113vh' }}>
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
			<form onSubmit={handleSubmit}>
				<Group>
					<Textarea
						value={contenido}
						onChange={e => setContenido(e.currentTarget.value)}
						icon={<IconMessage />}
						variant="filled"
						autosize
						minRows={1}
						maxRows={3}
						placeholder="Envía un mensaje"
						sx={{ width: '80%', marginLeft: '6vh' }}
					/>
					<ActionIcon
						type="submit"
						variant="filled"
						color="blue"
						radius="md"
						size="xl"
						w={60}
					>
						<IconSend />
					</ActionIcon>
				</Group>
			</form>
		</Stack>
	);
};

export default ChatBody;
