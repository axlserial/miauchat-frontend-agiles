import {
	Image,
	Group,
	Text,
	Button,
	Card,
	Grid,
	Paper,
	Box,
	Avatar, 
	useMantineTheme,
	TextInput, Modal
} from "@mantine/core";
import { useEventListener, useScrollIntoView, useDisclosure } from "@mantine/hooks";
import React, { useState,useCallback, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ModalCrearSala } from '../pages/crearModal';
import { useSalaStore } from "../stores/salaStore";
import { useSessionStore } from "../stores/sessionStore";
import { IconDoorExit, IconPlus } from "@tabler/icons-react";
import { Rutas } from "../routes";
import { logout } from "../services/usuarios";

// Forma de importar una imagen
import bgImage from "../assets/images/Icon_MiauChat.svg";

const floatingButtonStyle = {
	bottom: '20px',
	right: '20px',
	zIndex: 1000, // Asegura que el botón esté por encima de otros elementos en la página
  };


function PantallaPrincipal() {
	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
		HTMLDivElement,
		HTMLDivElement
	>();
	const navigate = useNavigate();
	const [exit, setExit] = useState(0);
	const increment = useCallback(() => setExit(1), []);
	const ref = useEventListener('click', increment);
	const theme = useMantineTheme();
	const usuario = useSessionStore((state) => state.usuario);
	const clearUsuario = useSessionStore((state) => state.clearUsuario);
	const { salas, fetchSalas } = useSalaStore();
	const rutaImagen = "/src/assets/images/Users_profile/" + getNombreImagen(usuario.id);
	useEffect(() => {
		(async () => await fetchSalas(usuario.id))()
	  }, []);
	console.log(salas);
	{/*salida de la app*/}
	useEffect(() => {
		if (exit==1) {
			logout().then(() => {
				clearUsuario();
				navigate(Rutas.login);
			});
		}
	},[exit])
	const listItems = salas.reverse().map((sala) => (
		<Box pt={1} pb={1} key={sala.id}>
			<Paper
				ref={targetRef}
				p="xl"
				sx={(theme) => ({
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[5]
							: theme.colors.gray[2],
					width: "100%",
				})}
			>
				<Button style={{ backgroundColor: "#e9ecef" }}>
					<Text color="black">{sala.nombre_sala}</Text>
				</Button>
			</Paper>
		</Box>
	));
	return (
		<div style={{ position: "relative" }}>
			{/* crear la estructura*/}
			<Card shadow="xl" radius="md" withBorder>
				{/*parte izquierda*/}
				<div
					style={{ width: "30%", height: "60vh", float: "left", backgroundColor: "lightblue" }}
				>
					<Card shadow="sm" padding="lg" radius="md" withBorder>
						<Card.Section>
							<Grid>
								<Grid.Col span={2}></Grid.Col>
								<Grid.Col span={8} style={{ height: "80%" }}>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											marginTop: "5%"
										}}
									>
										<Avatar
											src= {rutaImagen}
											radius="90%"
											size="30%"
										/>
									</div>
								</Grid.Col>
								<Grid.Col span={2}>
									<Group position="center">
										<Button rightIcon={<IconDoorExit size="3rem" stroke={2} />} pr={12} size="1.5vw" ref={ref}></Button>
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
							style={{ width: "50%" }}
							mt="md"
							radius="md"
						>
							Salas
						</Button>
						<Button
							variant="light"
							color="blue"
							style={{ width: "50%" }}
							mt="md"
							radius="md"
						>
							Estados
						</Button>
					</Card>
					<Group position="center">
						<Paper
							ref={scrollableRef}
							h={"56vh"}
							sx={{ overflowY: "scroll", flex: 1 }}
						>
							{listItems}
						</Paper>
					</Group>
					<div style={floatingButtonStyle}>
						<ButtonMenu/>
					</div>
					
				</div>
				
				{/*parte derecha*/}
				
				<div style={{ width: "70%", float: "right" }}>
					<div
						style={{
							backgroundColor: "",
							width: "60vw",
							height: "88vh",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginLeft: "20%"
						}}
					>
						<Image
							width={"60%"} height={"60%"}
							src={bgImage}
						/>
					</div>
				</div>
			</Card>
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
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */
			<ModalCrearSala/>
		}
      </Modal>

      <Group position="right">
		<div>
		<Button rightIcon={<IconPlus size="3rem" stroke={4} />} pr={12} variant="outline" onClick={open}></Button>
		</div>
        
      </Group>
    </>
  );
	}	
}

function getNombreImagen(numero: number) {
	const nombresImagenes = {
		1: "Gato_caja.png",
		2: "Gato_flor.png",
		3: "Gato_gorro.png",
		4: "Gato_maceta.png",
		5: "Gato_mause.png",
		6: "Gato_pez.png",
	  };
	const nombreImagen = nombresImagenes[numero];
	return nombreImagen;
  }
  
export default PantallaPrincipal;