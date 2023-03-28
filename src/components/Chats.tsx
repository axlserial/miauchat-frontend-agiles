import {
	AppShell,
	Header,
	ActionIcon,
	Menu,
	Button,
	Text,
	Modal,
	TextInput,
	Select,
	Badge,
	Loader,
	Flex
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useSalaStore } from '../stores/salaStore';
import ChatBody from './ChatBody';
import { IconMenu2 } from '@tabler/icons-react';
import {
	IconTransferOut,
	IconEdit,
	IconTrash,
	IconDotsVertical
} from '@tabler/icons-react';
import { useSessionStore } from '../stores/sessionStore';
import { useSocketStore } from '../stores/socket.store';
import { useEffect, useState } from 'react';
import {
	eliminarParticipante,
	cambiarNombreSala,
	eliminarSala,
	participantesSala,
	cambiarAdmiSala
} from '../services/salas';
import { notifications } from '@mantine/notifications';
import { Rutas } from '../routes';
import { useNavigate, useParams } from 'react-router-dom';
import { Sala, Usuario } from '../types';

function chats() {
	const { id } = useParams();
	const { height } = useViewportSize();
	const salaActual = useSalaStore(state => state.salaActual);
	const setActual = useSalaStore(state => state.setActual);
	const usuario = useSessionStore(state => state.usuario);
	const [modalNombre, setModalNombre] = useState(false);
	const [modalAbandonarAdmi, setModalAbandonarAdmi] = useState(false);
	const [modalEliminarSala, setModalEliminarSala] = useState(false);
	const [modalAbandonar, setModalAbandonar] = useState(false);
	const { fetchSalas, salas } = useSalaStore();
	//const nuevo_nombre:any="";
	const [nuevo_nombre, setValueNuevoNombre] = useState('');
	const navigate = useNavigate();

	const [participantes, setParticipantes] = useState<Usuario[]>([]);

	const handleGetParticipantes = async () => {
		const response = await participantesSala(id as string);
		const part = response.filter(p => p.id != usuario.id);
		setParticipantes(part);
		openModalAbandonarAdmi();
	};

	const [selectedParticipante, setSelectedParticipante] = useState<any>(null);
	const socket = useSocketStore(state => state.socket);

	const handleButtonClick = () => {
		if (selectedParticipante) {
			// llama a una función con el valor seleccionado como argumento
			abandonarSalaAdm(selectedParticipante);
		} else {
			console.log('Selecciona un participante primero');
		}
	};

	function openModalNombre() {
		setModalNombre(true);
	}
	function openModalAbandonarAdmi() {
		setModalAbandonarAdmi(true);
	}
	function openModalEliminarSala() {
		setModalEliminarSala(true);
	}
	function openModalAbandonar() {
		setModalAbandonar(true);
	}
	function closeModalAbandonar() {
		setModalAbandonar(false);
	}
	function closeModalNombre() {
		setModalNombre(false);
	}
	function closeModalAbandonarAdmi() {
		setModalAbandonarAdmi(false);
	}
	function closeModalEliminarSala() {
		setModalEliminarSala(false);
	}

	async function abandonar(usuario_id: number, sala_id: string) {
		console.log('abandonar');
		try {
			const data = await eliminarParticipante(usuario_id, sala_id);
			closeModalAbandonar();
			fetchSalas(usuario_id);
			navigate(Rutas.chats);
			notifications.show({
				title: 'Exitoso',
				color: 'green',
				message: 'Abandono de Sala exitoso'
			});
		} catch (error: any) {
			let mensaje = 'Falló el abandono de Sala';
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

	async function cambiarNombre(sala_id: string, nuevo_nombre: string) {
		try {
			const data = await cambiarNombreSala({ sala_id, nuevo_nombre });
			fetchSalas(usuario.id);

			const nuevaSala: Sala = { ...salaActual, nombre_sala: nuevo_nombre };
			socket?.emit('change-name-sala', nuevaSala);
			setActual(nuevaSala);

			notifications.show({
				title: 'Exitoso',
				color: 'green',
				message: 'Cambio de Nombre de Sala exitoso'
			});
		} catch (error: any) {
			let mensaje = 'Falló el cambio de Nombre de Sala';
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

	async function eliminarSalaActual(sala_id: string) {
		console.log('eliminar Sala chats');
		try {
			const data = await eliminarSala(sala_id);
			fetchSalas(usuario.id);

			socket?.emit('delete-sala', sala_id);

			navigate(Rutas.chats);
			notifications.show({
				title: 'Exitoso',
				color: 'green',
				message: 'Se eliminó la Sala exitosamente'
			});
		} catch (error: any) {
			let mensaje = 'Falló la eliminación de Sala';
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

	async function abandonarSalaAdm(usuario_id: number) {
		try {
			const data = await cambiarAdmiSala(usuario_id, salaActual.id);
			const data2 = await eliminarParticipante(usuario.id, salaActual.id);

			socket?.emit('new-admin', usuario_id, salaActual.id);

			fetchSalas(usuario.id);
			navigate(Rutas.chats);
			notifications.show({
				title: 'Exitoso',
				color: 'green',
				message: 'Has abandonada la sala exitosamente'
			});
		} catch (error: any) {
			let mensaje = 'Falló al abandonar sala';
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
					<Flex
						direction="row"
						justify="center"
						align="center"
						gap="10vh"
						sx={{ marginBottom: '3vh' }}
					>
						<div>
							<h2
								style={{
									fontSize: '24px',
									fontWeight: 'bold',
									marginBottom: '5px',
									marginLeft: '48vh'
								}}
							>
								{salaActual.nombre_sala}
							</h2>
							<Flex direction="row" gap="md">
								<Badge
									color="cyan"
									radius="md"
									style={{ fontSize: '16px', marginLeft: '48vh' }}
								>
									Código de acceso:
								</Badge>
								<Text
									variant="gradient"
									gradient={{ from: 'indigo', to: 'grey', deg: 45 }}
									sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
								>
									{salaActual.id}
								</Text>
							</Flex>
						</div>
						<div style={{marginTop: "3vh"}}>
							<Menu shadow="md" width={200}>
								<Menu.Target>
									<ActionIcon variant="subtle">
										<IconDotsVertical />
									</ActionIcon>
								</Menu.Target>

								<Menu.Dropdown>
									{salaActual.creador_id === usuario.id ? (
										<>
											<Menu.Item
												icon={<IconTransferOut size={14} />}
												onClick={handleGetParticipantes}
											>
												Abandonar Sala
											</Menu.Item>
											<Menu.Item
												icon={<IconTrash size={14} />}
												onClick={openModalEliminarSala}
											>
												Eliminar Sala
											</Menu.Item>
											<Menu.Item
												icon={<IconEdit size={14} />}
												onClick={openModalNombre}
											>
												Cambiar nombre de Sala
											</Menu.Item>
										</>
									) : (
										<>
											<Menu.Item
												icon={<IconTransferOut size={14} />}
												onClick={openModalAbandonar}
											>
												Abandonar Sala
											</Menu.Item>
										</>
									)}
								</Menu.Dropdown>
							</Menu>
						</div>
					</Flex>
				</Header>
			}
			sx={{ height: height - 120 }}
		>
			<Modal opened={modalNombre} onClose={() => setModalNombre(false)}>
				<h3> ¿Cambiar nombre de la sala {salaActual.nombre_sala}?</h3>
				<div>
					<div>
						<TextInput
							value={nuevo_nombre}
							onChange={event =>
								setValueNuevoNombre(event.currentTarget.value)
							}
							required
							label="Ingrese el nuevo nombre"
							placeholder="Cuartel Gatuno maravilla"
							radius="md"
						/>
					</div>
					<br />
					<div style={{ display: 'inline-block', marginLeft: '6rem' }}>
						<Button
							variant="gradient"
							gradient={{ from: 'indigo', to: 'cyan' }}
							onClick={() => cambiarNombre(salaActual.id, nuevo_nombre)}
						>
							Cambiar{' '}
						</Button>
					</div>
					<div style={{ display: 'inline-block', marginLeft: '2rem' }}>
						<Button
							variant="gradient"
							gradient={{ from: 'orange', to: 'red' }}
							onClick={closeModalNombre}
						>
							Cancelar
						</Button>
					</div>
				</div>
			</Modal>
			<Modal
				opened={modalAbandonarAdmi}
				onClose={() => setModalAbandonarAdmi(false)}
			>
				<h3> ¿Seguro que deseas abandonar la sala {salaActual.nombre_sala}?</h3>
				<p>Deberá elegir un nuevo administrador</p>

				<div>
					{participantes.length === 0 ? (
						<p>
							No hay participantes, si quiere salir tiene que borrar la sala
						</p>
					) : (
						<div>
							<div>
								<Select
									placeholder="Elija un nuevo administrador"
									data={
										participantes.map(participante => ({
											value: participante.id,
											label: participante.usuario
										})) as any
									}
									value={selectedParticipante}
									onChange={value => setSelectedParticipante(value)}
								/>
							</div>
							<br />
							<div
								style={{
									display: 'inline-block',
									marginLeft: '6rem'
								}}
							>
								<Button
									variant="gradient"
									gradient={{ from: 'indigo', to: 'cyan' }}
									onClick={handleButtonClick}
								>
									Abandonar
								</Button>
							</div>
							<div
								style={{
									display: 'inline-block',
									marginLeft: '2rem'
								}}
							>
								<Button
									variant="gradient"
									gradient={{ from: 'orange', to: 'red' }}
									onClick={closeModalAbandonarAdmi}
								>
									Cancelar
								</Button>
							</div>
						</div>
					)}
				</div>
			</Modal>
			<Modal opened={modalEliminarSala} onClose={() => setModalEliminarSala(false)}>
				<h3> ¿Seguro que deseas eliminar la sala {salaActual.nombre_sala}?</h3>
				<div>
					<div style={{ display: 'inline-block', marginLeft: '6rem' }}>
						<Button
							variant="gradient"
							gradient={{ from: 'indigo', to: 'cyan' }}
							onClick={() => eliminarSalaActual(salaActual.id)}
						>
							Eliminar
						</Button>
					</div>
					<div style={{ display: 'inline-block', marginLeft: '2rem' }}>
						<Button
							variant="gradient"
							gradient={{ from: 'orange', to: 'red' }}
							onClick={closeModalEliminarSala}
						>
							Cancelar
						</Button>
					</div>
				</div>
			</Modal>
			<Modal opened={modalAbandonar} onClose={() => setModalAbandonar(false)}>
				<h3> ¿Seguro que deseas abandonar la sala {salaActual.nombre_sala}?</h3>
				<div>
					<div style={{ display: 'inline-block', marginLeft: '6rem' }}>
						<Button
							variant="gradient"
							gradient={{ from: 'indigo', to: 'cyan' }}
							onClick={() => abandonar(usuario.id, salaActual.id)}
						>
							Abandonar
						</Button>
					</div>
					<div style={{ display: 'inline-block', marginLeft: '2rem' }}>
						<Button
							variant="gradient"
							gradient={{ from: 'orange', to: 'red' }}
							onClick={closeModalAbandonar}
						>
							Cancelar
						</Button>
					</div>
				</div>
			</Modal>
			<ChatBody sala={salaActual} />
		</AppShell>
	);
}

export default chats;
