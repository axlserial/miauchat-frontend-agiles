import {
	TextInput,
	Image,
	Stack,
	PasswordInput,
	Paper,
	Title,
	Container,
	Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react";
import { login } from "../services/usuarios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

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

			// si no hay error, redirige a la página de inicio
			navigate("/chats");
		} catch (error: any) {
			notifications.show({
				title: "Error",
				color: "red",
				message: 'Usuario o contraseña incorrectos',
			});
		}
	};

	return (
		<div>
			<Container>
				<Paper shadow="sm" radius="sm" p="x1" withBorder>
					<Stack
						align="center"
						justify="space-around"
						sx={{ padding: "70px 15px 0px 15px" }}
					>
						<Image
							width={200}
							height={200}
							fit="contain"
							src="src/assets/images/Icon_MiauChat.svg"
						/>
						<Container>
							<Title
								sx={(theme) => ({
									fontFamily: `Open Sans, ${theme.fontFamily}`,
									fontWeight: 600,
									fontSize: "25px",
									paddingTop: "30px",
									paddingBottom: "50px",
								})}
							>
								¡Bienvenido a MiauChat!
							</Title>
						</Container>
					</Stack>
					<form onSubmit={handleSubmit}>
						<Container size={500} sx={{ padding: "0px 15px 90px 15px" }}>
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
							</Stack>
						</Container>
					</form>
				</Paper>
			</Container>
		</div>
	);
};

export default Login;
