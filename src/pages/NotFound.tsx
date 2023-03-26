import notfound_image from "../assets/images/dibujo.svg";
import { Title, Image, Flex, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Rutas } from "../routes";

const NotFound = () => {

	const navigate = useNavigate();

	return (
		<Flex gap={{ base: 'md', sm: 'sx' }}
			justify="center"
			align="center"
			direction={{ base: 'column' }}
			wrap="wrap"
			sx={{ padding: "15% 20%" }}
		>

			<Image height={250} fit="fill" src={notfound_image} />

			<Title order={1} weight={100} fw={700} variant="gradient"
				gradient={{ from: 'indigo', to: 'cyan', deg: 50 }} ta="center">Ruta no encontrada</Title>

			<Button onClick={() => navigate(Rutas.chats)}>
				Regresar a la página principal
			</Button>

		</Flex>
	);
};

export default NotFound;
