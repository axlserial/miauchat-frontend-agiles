import {
	ActionIcon,
	Group,
	Text,
	Button,
	Card,
	Grid,
	Paper,
	Box,
	Avatar,
	useMantineTheme,
	Loader,
	Modal
} from '@mantine/core';
import { useScrollIntoView, useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalCrearSala } from '../pages/crearModal';
import { useSalaStore } from '../stores/salaStore';
import { useSessionStore } from '../stores/sessionStore';
import { useSocketStore } from '../stores/socket.store';
import { IconDoorExit, IconPlus } from '@tabler/icons-react';
import { Rutas } from '../routes';
import { logout } from '../services/usuarios';
import { useParams } from 'react-router-dom';

// Forma de importar una imagen
import Layout from '../components/Layout';
import img1 from '../assets/images/Users_profile/Gato_caja.png';
import img2 from '../assets/images/Users_profile/Gato_flor.png';
import img3 from '../assets/images/Users_profile/Gato_gorro.png';
import img4 from '../assets/images/Users_profile/Gato_maceta.png';
import img5 from '../assets/images/Users_profile/Gato_mause.png';
import img6 from '../assets/images/Users_profile/Gato_pez.png';
import { Sala } from '../types';

const floatingButtonStyle = {
	bottom: '20px',
	right: '20px',
	zIndex: 1000 // Asegura que el botón esté por encima de otros elementos en la página
};

function PantallaPrincipal() {
	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
		HTMLDivElement,
		HTMLDivElement
	>();

	const navigate = useNavigate();
	const clearUsuario = useSessionStore(state => state.clearUsuario);
	const { salas, setSalas, fetchSalas, setActual } = useSalaStore();
	const usuario = useSessionStore(state => state.usuario);
	const setSocket = useSocketStore(state => state.setSocket);
	const closeSocket = useSocketStore(state => state.closeSocket);
	let { id } = useParams();

	const [loading, setLoading] = useState(true);

	let component = null;

	if (usuario.foto_perfil == 1)
		component = <Avatar src={img1} radius="90%" size="30%" />;
	if (usuario.foto_perfil == 2)
		component = <Avatar src={img2} radius="90%" size="30%" />;
	if (usuario.foto_perfil == 3)
		component = <Avatar src={img3} radius="90%" size="30%" />;
	if (usuario.foto_perfil == 4)
		component = <Avatar src={img4} radius="90%" size="30%" />;
	if (usuario.foto_perfil == 5)
		component = <Avatar src={img5} radius="90%" size="30%" />;
	if (usuario.foto_perfil == 6)
		component = <Avatar src={img6} radius="90%" size="30%" />;

	useEffect(() => {
		setSocket(usuario.id, salas, fetchSalas, setSalas, setActual, navigate);
		fetchSalas(usuario.id)
			.then(data => {
				if (id != undefined) {
					const salaAct = data.find(
						(sala: { id: string | undefined }) => sala.id == id
					);
					setActual(salaAct as Sala);
				}
			})
			.finally(() => setLoading(false));
	}, []);

	const listItems = salas.map(sala => (
		<Box pt={1} pb={1} key={sala.id}>
			<Paper
				ref={targetRef}
				p="xl"
				sx={theme => ({
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[5]
							: theme.colors.gray[2],
					width: '100%'
				})}
			>
				<Button
					style={{ backgroundColor: '#e9ecef' }}
					onClick={() => {
						setActual(sala);
						navigate(Rutas.chats + `/${sala.id}`);
					}}
				>
					<Text color="black">{sala.nombre_sala}</Text>
				</Button>
			</Paper>
		</Box>
	));
	return (
		<div>
			{loading ? (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)'
					}}
				>
					<Loader size="lg" />
				</div>
			) : (
				<div style={{ position: 'relative' }}>
					{/* crear la estructura*/}
					<Card shadow="xl" radius="md" withBorder>
						{/*parte izquierda*/}
						<div
							style={{
								width: '30%',
								float: 'left'
							}}
						>
							<Card shadow="sm" padding="lg" radius="md" withBorder>
								<Card.Section>
									<Grid>
										<Grid.Col span={2}></Grid.Col>
										<Grid.Col span={8} style={{ height: '80%' }}>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													marginTop: '5%'
												}}
											>
												{/*foto de perfil */}
												{component}
											</div>
										</Grid.Col>
										<Grid.Col span={2}>
											<Group position="center">
												<Button
													variant="light"
													rightIcon={
														<IconDoorExit
															size="4vh"
															stroke={2}
														/>
													}
													onClick={() =>
														logout().then(() => {
															clearUsuario();
															closeSocket();
															navigate(Rutas.login);
														})
													}
													style={{
														marginRight: '5vh',
														marginTop: '1vh'
													}}
													pr={12}
													size="1.5vw"
												></Button>
											</Group>
										</Grid.Col>
									</Grid>
								</Card.Section>

								<Group position="center" mt="md" mb="xs">
									<Text weight={500}>{usuario.usuario}</Text>
								</Group>

								<Button
									variant="light"
									color="blue"
									style={{ width: '50%' }}
									mt="md"
									radius="md"
								>
									Salas
								</Button>
								<Button
									variant="light"
									color="blue"
									style={{ width: '50%' }}
									mt="md"
									radius="md"
								>
									Estados
								</Button>
							</Card>
							<Group position="center">
								<Paper
									ref={scrollableRef}
									h={'55vh'}
									sx={{ overflowY: 'scroll', flex: 1 }}
								>
									{listItems}
								</Paper>
							</Group>
							<div style={floatingButtonStyle}>
								<ButtonMenu />
							</div>
						</div>

						{/*parte derecha*/}

						<div style={{ width: '70%', float: 'right' }}>
							<Layout />
						</div>
					</Card>
				</div>
			)}
		</div>
	);
	function ButtonMenu() {
		const theme = useMantineTheme();
		const [opened, { open, close }] = useDisclosure(false);
		return (
			<>
				<Modal
					opened={opened}
					onClose={close}
					title="Crear/Unirse a Sala"
					overlayProps={{
						color:
							theme.colorScheme === 'dark'
								? theme.colors.dark[9]
								: theme.colors.gray[2],
						opacity: 0.55,
						blur: 3
					}}
				>
					{/* Modal content */ <ModalCrearSala />}
				</Modal>

				<Group position="right">
					<div>
						<ActionIcon
							size={45}
							w={50}
							variant="outline"
							onClick={open}
							color="blue"
						>
							<IconPlus size="3rem" stroke={4} />
						</ActionIcon>
					</div>
				</Group>
			</>
		);
	}
}

export default PantallaPrincipal;
