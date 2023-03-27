import { useState } from 'react';
import { Text, Paper, Card, Badge, Flex, ActionIcon } from '@mantine/core';
import { IconFile, IconDownload } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

import { downloadAdjunto } from '../utils/download';
import { Mensaje_sala } from '../types';

type ChatMessageProps = {
	mensaje: Mensaje_sala;
	esPropio: boolean;
};

const ChatMessage = ({ mensaje, esPropio }: ChatMessageProps) => {
	const [fileDownloading, setFileDownloading] = useState(false);

	return (
		<Paper
			p="md"
			shadow="sm"
			sx={{
				backgroundColor: esPropio ? '#b0f4ff' : '#d9d9d9',
				margin: '0.2vh 0',
				borderRadius: '1rem',
				maxWidth: '50%',
				minWidth: '20%',
				alignSelf: esPropio ? 'flex-end' : 'flex-start'
			}}
		>
			<Text fw={700} c={esPropio ? '#008599' : '#495057'}>
				{esPropio ? 'Tú' : mensaje.mensaje.usuario}
			</Text>

			<Text
				fz="sm"
				c="#545454"
				sx={{
					fontFamily: 'Greycliff CF, sans-serif',
					wordWrap: 'break-word'
				}}
			>
				{mensaje.mensaje.contenido}
			</Text>

			{/* Archivo adjunto */}
			{mensaje.mensaje.es_adjunto == 1 && (
				<Card
					sx={{
						marginTop: '1vh',
						backgroundColor: esPropio ? '#A0E6F1' : '#D0D0D0'
					}}
				>
					<Badge
						fullWidth
						radius="xs"
						leftSection={
							<Flex align="center">
								<IconFile />
							</Flex>
						}
						sx={{ height: '4vh' }}
					>
						<Text>Archivo adjunto</Text>
					</Badge>
					<Flex
						direction="row"
						gap="md"
						align="center"
						justify="center"
						sx={{ marginTop: 10, width: '100%' }}
					>
						<ActionIcon
							variant="transparent"
							color={esPropio ? '#008599' : '#495057'}
							loading={fileDownloading}
							onClick={async () => {
								try {
									setFileDownloading(true);
									await downloadAdjunto(
										mensaje.archivo?.nombre_server as string,
										mensaje.archivo?.nombre_archivo as string,
										mensaje.archivo?.extension as string
									);
								} catch (error) {
									notifications.show({
										title: 'Error',
										color: 'red',
										message: 'Error al descargar el archivo'
									});
								} finally {
									setFileDownloading(false);
								}
							}}
						>
							<IconDownload />
						</ActionIcon>
						<Text
							fz="sm"
							c={esPropio ? '#008599' : '#495057'}
							sx={{
								fontFamily: 'Greycliff CF, sans-serif',
								wordWrap: 'break-word'
							}}
						>
							{mensaje.archivo?.nombre_archivo +
								'.' +
								mensaje.archivo?.extension}
						</Text>
					</Flex>
				</Card>
			)}
		</Paper>
	);
};

export default ChatMessage;
