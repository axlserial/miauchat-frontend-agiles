import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useSocketStore } from '../stores/socket.store';
import { getMensajes } from '../services/mensajes';
import { Sala, Mensaje_sala } from '../types';

type ChatBodyProps = {
	sala: Sala;
};

const ChatBody = ({ sala }: ChatBodyProps) => {
	const socket = useSocketStore(state => state.socket);
	const [mensajes, setMensajes] = useState<Mensaje_sala[]>([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

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

	if (loading) {
		return (
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '65%',
					transform: 'translate(-50%, -50%)'
				}}
			>
				<Loader size="lg" />
			</div>
		);
	}

	if (error) {
		return <div>Error</div>;
	}

	return <div>Chat body</div>;
};

export default ChatBody;
