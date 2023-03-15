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
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';

const Login = () => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};
  
  return (
    <div >
      <Container >
        <Paper shadow="sm" radius="sm" p="x1" withBorder>
          <Stack
            align="center"
            justify="space-around"
            sx={{ padding: "70px 15px 0px 15px" }}
          >
            <Image width={200} height={200} fit="contain" src="src/assets/images/Icon_MiauChat.svg" />
            <Container>
              <Title
                sx={(theme) => ({
                  fontFamily: `Open Sans, ${theme.fontFamily}`,
                  fontWeight: 600,
                  fontSize: "25px",
                  paddingTop: "30px",
                  paddingBottom: "50px",
                })}>
                ¡Bienvenido a MiauChat!
              </Title>
            </Container>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Container size={500} sx={{ padding: "0px 15px 90px 15px" }}>
              <Stack
                spacing="xl"
              >
                <TextInput
                  name="user"
                  label="Usuario"
                  placeholder="michiUsuario06"
                  size="md"
                  required

                />
                <PasswordInput
                  label="Contraseña"
                  placeholder="*****"
                  size="md"
                  visibilityToggleIcon={({ reveal, size }) =>
                    reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
                  }
                  required
                />

                <Button variant="gradient" gradient={{ from: 'cyan', to: '#26D6F1', deg: 35 }} size="md" >
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
