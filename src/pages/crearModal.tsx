import { useForm } from '@mantine/form';
import {
	TextInput,
	Text,
	Paper,
	Group,
	PaperProps,
	Button,
	Anchor,
	Stack
} from '@mantine/core';

import { crear, unirse } from '../services/salas';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { useSessionStore } from '../stores/sessionStore';
import { useSalaStore } from '../stores/salaStore';
import { useSocketStore } from '../stores/socket.store';
import { Socket } from 'socket.io-client';
import { Rutas } from '../routes';
import { useState } from 'react';

export function ModalCrearSala(props: PaperProps) {
	const socket = useSocketStore(state => state.socket);
	const navigate = useNavigate();
	const usuario = useSessionStore(state => state.usuario);
	const { fetchSalas, setActual } = useSalaStore();
	const form = useForm({
		initialValues: {
			name: '',
			terms: true,
			id: usuario.id
		}
	});

	// 0: crear, 1: unirse
	const [accion, setAccion] = useState(0);

	return (
		<Paper radius="md" p="xl" withBorder {...props}>
			<Text size="lg" weight={500}>
				¿Quiere {accion === 0 ? 'crear' : 'unirse a'} una sala?
			</Text>

			{/* <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}

			<form onSubmit={form.onSubmit(() => {})}>
				<Stack>
					{accion === 1 && (
						<TextInput
							required
							label="Código de Sala"
							placeholder="7*SF-65"
							value={form.values.name}
							onChange={event =>
								form.setFieldValue('name', event.currentTarget.value)
							}
							error={form.errors.name && 'Código inválido'}
							radius="md"
						/>
					)}

					{accion === 0 && (
						<TextInput
							required
							label="Nombre de Sala"
							placeholder="Cuartel Gatuno :3"
							value={form.values.name}
							onChange={event =>
								form.setFieldValue('name', event.currentTarget.value)
							}
							error={form.errors.name && 'Nombre inválido'}
							radius="md"
						/>
					)}
				</Stack>

				<Group position="apart" mt="xl">
					<Anchor
						component="button"
						type="button"
						color="dimmed"
						onClick={() => setAccion(accion === 0 ? 1 : 0)}
						size="xs"
					>
						{accion === 1
							? '¿Desea crear a una Sala?'
							: '¿Desea unirse a una Sala?'}
					</Anchor>
					<Button
						type="submit"
						radius="xl"
						onClick={() =>
							accion === 0
								? crearSala(form.values.id, form.values.name, socket)
								: unirseSala(form.values.id, form.values.name, socket)
						}
					>
						{accion === 0 ? 'Crear' : 'Unirse'}
					</Button>
				</Group>
			</form>
		</Paper>
	);

	async function crearSala(
		creador_id: number,
		nombre_sala: string,
		socket: Socket | null
	) {
		try {
			const data = await crear({ creador_id, nombre_sala });
			socket!.emit('join-salas');

			await fetchSalas(creador_id);
			setActual(data);
			navigate(Rutas.chats + `/${data.id}`);
			notifications.show({
				title: 'Exitoso',
				color: 'green',
				message: 'Se creo la sala exitosamente, su código es ' + data.id
			});
		} catch (error: any) {
			let mensaje = 'Ingrese el nombre de la Sala';
			if (error.message === 'Failed to fetch') {
				mensaje = 'Error de conexión, intente de nuevo';
			}

			notifications.show({
				title: 'Error',
				color: 'red',
				message: mensaje
			});
		}
	}
	async function unirseSala(
		usuario_id: number,
		sala_id: string,
		socket: Socket | null
	) {
		try {
			const data = await unirse({ usuario_id, sala_id });
			socket!.emit('join-salas');

			await fetchSalas(usuario_id);
			setActual(data);
			navigate(Rutas.chats + `/${sala_id}`);
			notifications.show({
				title: 'Exitoso',
				color: 'green',
				message: 'Te has unido a la sala'
			});
		} catch (error: any) {
			let mensaje = 'Código de sala incorrecto';
			if (error.message === 'Failed to fetch') {
				mensaje = 'Error de conexión, intente de nuevo';
			}

			notifications.show({
				title: 'Error',
				color: 'red',
				message: mensaje
			});
		}
	}
}
