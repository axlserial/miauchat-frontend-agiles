import { Text, Paper } from '@mantine/core';
import { Mensaje_sala } from '../types';

type ChatMessageProps = {
	mensaje: Mensaje_sala;
	esPropio: boolean;
};

const ChatMessage = ({ mensaje, esPropio }: ChatMessageProps) => {
	return (
		<Paper
			p="md"
			shadow="sm"
			sx={{
				backgroundColor: esPropio ? '#b0f4ff' : '#d9d9d9',
				margin: '0.5rem 0',
				borderRadius: '1rem',
				maxWidth: '50%',
				minWidth: '25%',
				alignSelf: esPropio ? 'flex-end' : 'flex-start'
			}}
		>
			<Text>{esPropio ? 'Tú' : mensaje.mensaje.usuario}</Text>
			<Text>{mensaje.mensaje.contenido}</Text>
		</Paper>
	);
};

export default ChatMessage;
