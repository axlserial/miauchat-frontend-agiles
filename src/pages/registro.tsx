import {
	Tooltip,
	Avatar,
	Card,
	TextInput,
	Button,
	Image,
	PasswordInput,
	Text,
} from "@mantine/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/usuarios";
import { notifications } from "@mantine/notifications";

import { useSessionStore } from "../stores/sessionStore";
import { Rutas } from "../routes";

import bgImage from "../assets/images/Icon_MiauChat.svg";
function Registro() {
	const setUsuario = useSessionStore((state) => state.setUsuario);
	const [image_select, set_image_select] = useState(0);
	const rutaImagen = "/src/assets/images/Users_profile/";
	console.log(rutaImagen)
	const [bandera, set_bandera] = useState(0);
	const changeImage = (idImagen: number) => {
		set_image_select(idImagen);
	};
	const changeBandera = (bandera: number) => {
		set_bandera(bandera);
	};
	const navigate = useNavigate();
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const usuario = formData.get("user") as string;
		const password = formData.get("password") as string;
		const password2 = formData.get("password2") as string;
		const foto_perfil = image_select;
		if (!usuario || !password || !password2 || !foto_perfil) {
			notifications.show({
				title: "Error",
				color: "red",
				message: "Ingresar todos los datos solicitados",
			});
		}

		if (password == password2) {
			changeBandera(0);
			if (!usuario || !password || !password2 || !foto_perfil) return;
			// llama al servicio
			try {
				const data = await signup({ usuario, password, foto_perfil });
				
				// guarda el usuario en el store y navega a la ruta chats
				setUsuario(data);
				navigate(Rutas.chats);
			} catch (error: any) {
				notifications.show({
					title: "Error",
					color: "red",
					message: "datos incorrectos",
				});
			}
		} else changeBandera(1);
		return;
	};
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Card
				shadow="sm"
				padding="lg"
				radius="md"
				style={{
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex_start",
					padding: 31,
					gap: 53,
					position: "absolute",
					width: "50%",
					height: "90%",
					top: "5%",
					background: "#ffffff",
					boxShadow:
						"0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.05)",
					borderRadius: 4,
					margin: "0 auto",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Image
						style={{
							position: "absolute",
							width: "20%",
							height: "10%",
							top: "5%",
						}}
						src={bgImage}
					/>
				</div>
				<div
					style={{
						position: "absolute",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "30%",
						height: "15%",
						left: "35%",
						top: "25%",
						fontStyle: "normal",
						fontWeight: 600,
						fontSize: 25,
						lineHeight: 155,
						color: "black",
					}}
				>
					<Text
						sx={(theme) => ({
							fontFamily: `Open Sans, ${theme.fontFamily}`,
							fontWeight: 600,
							fontSize: "25px",
							paddingTop: "30px",
							paddingBottom: "50px",
						})}
						ta="center"
						fz="xl"
						fw={500}
					>
						Miau-Registro
					</Text>
				</div>
				<form onSubmit={handleSubmit}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<TextInput
							fz="xs"
							radius="sm"
							label="Nombre de usuario"
							placeholder=""
							name="user"
							style={{
								position: "absolute",
								flexDirection: "column",
								height: "5%",
								width: "70%",
								left: "15%",
								top: "35%",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<div
							style={{
								height: "5%",
								width: "70%",
								left: "15%",
								top: "45%",
								position: "absolute",
							}}
						>
							<Text ta="left" fz="sm" fw={500}>
								Elija una foto
							</Text>
							<Tooltip.Group openDelay={300} closeDelay={100}>
								<Avatar.Group spacing="30">
									<Tooltip label="Gato en caja" withArrow>
										<Avatar
											src={rutaImagen+getNombreImagen(1)}
											radius="xl"
											size={image_select == 1 ? "15%" : "md"}
											onClick={() => {
												changeImage(1);
											}}
										/>
									</Tooltip>
									<Tooltip label="Gato con Flores" withArrow>
										<Avatar
											src={rutaImagen+getNombreImagen(2)}
											radius="xl"
											size={image_select == 2 ? "15%" : "md"}
											onClick={() => {
												changeImage(2);
											}}
										/>
									</Tooltip>
									<Tooltip label="Gato con gorro" withArrow>
										<Avatar
											src={rutaImagen+getNombreImagen(3)}
											radius="xl"
											size={image_select == 3 ? "15%" : "md"}
											onClick={() => {
												changeImage(3);
											}}
										/>
									</Tooltip>
									<Tooltip label="Gato en maceta" withArrow>
										<Avatar
											src={rutaImagen+getNombreImagen(4)}
											radius="xl"
											size={image_select == 4 ? "15%" : "md"}
											onClick={() => {
												changeImage(4);
											}}
										/>
									</Tooltip>
									<Tooltip label="Gato mause" withArrow>
										<Avatar
											src={rutaImagen+getNombreImagen(5)}
											radius="xl"
											size={image_select == 5 ? "15%" : "md"}
											onClick={() => {
												changeImage(5);
											}}
										/>
									</Tooltip>
									<Tooltip label="Gato pez" withArrow>
										<Avatar
											src={rutaImagen+getNombreImagen(6)}
											radius="xl"
											size={image_select == 6 ? "15%" : "md"}
											onClick={() => {
												changeImage(6);
											}}
										/>
									</Tooltip>
								</Avatar.Group>
							</Tooltip.Group>
						</div>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<PasswordInput
							placeholder=""
							label="Contraseña"
							name="password"
							style={{
								flexDirection: "column",
								alignItems: "flex-start",
								position: "absolute",
								height: "5%",
								width: "70%",
								left: "15%",
								top: "60%",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<PasswordInput
							error={bandera == 1 ? "Contraseñas diferentes" : ""}
							placeholder=""
							label="Confirmar contraseña"
							name="password2"
							style={{
								flexDirection: "column",
								alignItems: "flex-start",
								position: "absolute",
								height: "5%",
								width: "70%",
								left: "15%",
								top: "70%",
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Button
							style={{
								position: "absolute",
								height: "5%",
								width: "70%",
								left: "15%",
								top: "85%",
							}}
							variant="gradient"
							type="submit"
							gradient={{ from: "cyan", to: "#26D6F1", deg: 35 }}
							size="md"
						>
							Registrarse
						</Button>
					</div>
				</form>
			</Card>
		</div>
	);
}

function getNombreImagen(numero: number) {
	const nombreImagen: {[numero: number]:any} = {
		1: "Gato_caja.png",
		2: "Gato_flor.png",
		3: "Gato_gorro.png",
		4: "Gato_maceta.png",
		5: "Gato_mause.png",
		6: "Gato_pez.png",
	  
	};	
	return nombreImagen[numero];
}

export default Registro;
