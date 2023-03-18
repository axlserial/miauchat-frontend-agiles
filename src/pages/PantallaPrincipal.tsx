import {
	Image,
	Group,
	Text,
	Badge,
	Button,
	Card,
	Container,
	Grid,
	Navbar,
	Paper,
	Box,
	Avatar,
	AppShell,
	Header,
} from "@mantine/core";
import { useEventListener, useScrollIntoView } from "@mantine/hooks";
import React, { useState,useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PantallaPrincipal() {
	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
		HTMLDivElement,
		HTMLDivElement
	>();
	const navigate = useNavigate();
	const salas_ejemplo = ["sala1", "sala2", "sala3", "sala4", "sala5"];
	const nombre_ejemplo = "nombre1";
	const [exit, setExit] = useState(0);
	const increment = useCallback(() => setExit(1), []);
	const ref = useEventListener('click', increment);
	{/*salida de la app*/}
	useEffect(() => {
		if (exit==1) {
		  navigate('/iniciar-sesion');
		}
	},[exit])
	const listItems = salas_ejemplo.map((cad, index) => (
		<Box pt={1} pb={1} key={index}>
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
					<Text color="black">{cad}</Text>
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
					style={{ width: "30%", height: "88vh", float: "left", backgroundColor: "lightblue" }}
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
											src="/src/assets/images/Users_profile/Gato_maceta.png"
											radius="90%"
											size="30%"
										/>
									</div>
								</Grid.Col>
								<Grid.Col span={2}>
									<Group position="center">
										<Button size="1.5vw" ref={ref}>Salir</Button>
									</Group>
								</Grid.Col>
							</Grid>
						</Card.Section>

						<Group position="center" mt="md" mb="xs">
							<Text weight={500}>{nombre_ejemplo}</Text>
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
							h={"45vh"}
							sx={{ overflowY: "scroll", flex: 1 }}
						>
							{/*cargar salas*/}
							{listItems}
						</Paper>
					</Group>
					<div>
						boton add
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
							src="src/assets/images/Icon_MiauChat.svg"
						/>
					</div>
				</div>
			</Card>
		</div>
	);
}

export default PantallaPrincipal;
