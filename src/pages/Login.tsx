import {
	TextInput,
	Image,
	Stack,
	PasswordInput,
	Paper,
	Title,
	Container,
	Button,
	Text,
	Card,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import { login } from "../services/usuarios";
import { useNavigate, Link } from "react-router-dom";

import { Rutas } from "../routes";
import { useSessionStore } from "../stores/sessionStore";

import loginImage from "../assets/images/Icon_MiauChat.svg";

const Login = () => {
	const navigate = useNavigate();
	const setUsuario = useSessionStore((state) => state.setUsuario);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const usuario = formData.get("user") as string;
		const password = formData.get("password") as string;

		// verifica
		if (!usuario || !password) return;

		// llama al servicio
		try {
			const data = await login({ usuario, password });

			// guarda el usuario en el store y navega a la ruta chats
			setUsuario(data);
			navigate(Rutas.chats);
		} catch (error: any) {
			let mensaje = "Usuario o contraseña incorrectos";
			if (error.message === "Failed to fetch") {
				mensaje = "Error de conexión, intente de nuevo";
			}

			notifications.show({
				title: "Error",
				color: "red",
				message: mensaje,
			});
		}
	};

	return (
		<div>
			<Container>
				<Card shadow="sm" radius="sm" withBorder sx={{}}>
					<Stack
						align="center"
						style={{ paddingTop:"2%"}}
					>
						<Image
							width={150}
							height={150}
							fit="contain"
							src={loginImage}
						/>
						<Container>
							<Title
								sx={(theme) => ({
									fontFamily: `Open Sans, ${theme.fontFamily}`,
									fontWeight: 600,
									fontSize: "156%",
									paddingTop: "10%",
									paddingBottom: "10%",
								})}
							>
								¡Bienvenido a MiauChat!
							</Title>
						</Container>
					</Stack>
					<form onSubmit={handleSubmit}>
						<Container size="xs" sx={{paddingBottom:"3%"}}>
							<Stack spacing="xl">
								<TextInput
									name="user"
									label="Usuario"
									placeholder="michiUsuario06"
									size="md"
									required
								/>
								<PasswordInput
									name="password"
									label="Contraseña"
									placeholder="*****"
									size="md"
									visibilityToggleIcon={({ reveal, size }) =>
										reveal ? (
											<IconEyeOff size={size} />
										) : (
											<IconEyeCheck size={size} />
										)
									}
									required
								/>

								<Button
									variant="gradient"
									type="submit"
									gradient={{ from: "cyan", to: "#26D6F1", deg: 35 }}
									size="md"
								>
									Ingresar
								</Button>
								<Stack justify="center" align="center" spacing="xs">
									<Link to="/registrarse">
										<Text size="sm">¿Sin cuenta? Regístrate</Text>
									</Link>
								</Stack>
							</Stack>
						</Container>
					</form>
				</Card>
			</Container>
		</div>
	);
};

export default Login;
