import {
	Notification,
	Center,
	Stack,
	ScrollArea,
	Textarea,
	ActionIcon,
	Group,
	Indicator
} from '@mantine/core';
import { useEffect, useState, useRef } from 'react';
import { IconMessage, IconSend, IconPaperclip } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useParams } from 'react-router-dom';

import { useSocketStore } from '../stores/socket.store';
import { useSessionStore } from '../stores/sessionStore';
import { getMensajes } from '../services/mensajes';
import { Sala, Mensaje_sala, DataSend } from '../types';
import ChatMessage from './ChatMessage';
import AdjuntoModal from './AdjuntoModal';

type ChatBodyProps = {
	sala: Sala;
};

const ChatBody = ({ sala }: ChatBodyProps) => {
	const { id } = useParams();

	// Se obtiene el usuario de la sesion
	const usuario = useSessionStore(state => state.usuario);

	// Almacena los mensajes de la sala
	const [mensajes, setMensajes] = useState<Mensaje_sala[]>([]);

	// Estado de carga
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	// Referencia al scroll
	const scrollRef = useRef<HTMLDivElement>(null);

	// Referencia al boton de enviar
	const btnSubmitRef = useRef<HTMLButtonElement>(null);

	// Adjunto
	const [adjunto, setAdjunto] = useState<File | null>(null);
	const [adjuntoModalVisible, setAdjuntoModalVisible] = useState(false);

	// Socket
	const socket = useSocketStore(state => state.socket);

	// Se escucha el evento de nuevo mensaje
	socket?.on('message-receive', (data: Mensaje_sala) => {
		if (!id || id !== sala.id) return;

		if (data.mensaje.sala_id === sala.id) {
			setMensajes([...mensajes, data]);
		}
	});

	// Se obtienen los mensajes de la sala
	const obtenerMensajes = () =>
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
			});

	useEffect(() => {
		setLoading(true);
		obtenerMensajes().finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		obtenerMensajes();
	}, [sala]);

	// Se hace scroll al final de la lista de mensajes
	useEffect(() => {
		scrollRef.current?.scrollIntoView({
			block: 'end'
		});
	}, [mensajes]);

	// Contenido del mensaje
	const [contenido, setContenido] = useState('');

	// Maneja el envio del mensaje
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Eliminar espacios en blanco al inicio y al final
		const cont = contenido.trim();

		// Si no hay contenido y no hay adjunto, no se envia el mensaje
		if (cont === '' && !adjunto) {
			return;
		}

		// Se crea el objeto que se enviara al servidor
		const data: DataSend = {
			mensajeData: {
				contenido: cont,
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
				es_adjunto: adjunto ? 1 : 0
			}
		};

		// Si hay adjunto, se agrega al objeto
		if (adjunto) {
			const nombre = adjunto.name.split('.');
			const extension = nombre.pop() as string;

			data.archivoData = {
				archivo: adjunto,
				nombre: nombre.join('.'), // Nombre sin la extension
				extension
			};
		}

		// Se envia el mensaje al servidor
		socket?.emit('message-send', data, (newMsj: Mensaje_sala) => {
			setAdjunto(null);
			setContenido('');
			setMensajes([...mensajes, newMsj]);
		});
	};

	// En caso de que se este cargando
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

	// En caso de que ocurra un error
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
			{/* Área de chat */}
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

			{/* Área de envío de mensajes */}
			<form onSubmit={handleSubmit}>
				<Group>
					{/* Entrada del mensaje */}
					<Textarea
						value={contenido}
						onChange={e => setContenido(e.currentTarget.value)}
						icon={<IconMessage />}
						variant="filled"
						autosize
						minRows={1}
						maxRows={3}
						placeholder="Envía un mensaje"
						sx={{ width: '70%', marginLeft: '9vh' }}
						onKeyDown={e => {
							// Si se presiona enter y no se presiona shift, se envia el mensaje
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault();
								btnSubmitRef.current?.click();
							}
						}}
					/>

					{/* Botón para subir archivos */}
					{!adjunto ? (
						<ActionIcon onClick={() => setAdjuntoModalVisible(true)}>
							<IconPaperclip />
						</ActionIcon>
					) : (
						<Indicator>
							<ActionIcon onClick={() => setAdjuntoModalVisible(true)}>
								<IconPaperclip />
							</ActionIcon>
						</Indicator>
					)}

					{/* Botón para enviar el mensaje */}
					<ActionIcon
						ref={btnSubmitRef}
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

			{/* Modal para subir archivos */}
			<AdjuntoModal
				visible={adjuntoModalVisible}
				setVisible={setAdjuntoModalVisible}
				archivo={adjunto}
				setArchivo={setAdjunto}
			/>
		</Stack>
	);
};

export default ChatBody;
