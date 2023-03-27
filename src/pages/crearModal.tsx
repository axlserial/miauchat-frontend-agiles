import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';

import { crear, unirse } from '../services/salas'
import { useNavigate, Link } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useSessionStore } from "../stores/sessionStore";
import { IconDatabaseExport } from '@tabler/icons-react';
import { useSalaStore } from '../stores/salaStore';
import { Rutas } from '../routes';

export function ModalCrearSala(props: PaperProps) {
  const navigate = useNavigate();
  const usuario = useSessionStore((state) => state.usuario);
  const { fetchSalas, setActual } = useSalaStore();
  const [type, toggle] = useToggle(['crear', 'unirse']);
  const form = useForm({
    initialValues: {
      name: '',
      terms: true,
      id : usuario.id,
    },
  });
  
  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        ¿Quiere {type} una sala? 
      </Text>

      {/* <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {type === 'unirse' && (
            <TextInput
            required
            label="Código de Sala"
            placeholder= "7*SF-65"
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            error={form.errors.name && 'Código inválido'}
            radius="md"
          />
          )}

			{type === 'crear' && (
            <TextInput
            required
            label="Nombre de Sala"
            placeholder= "Cuartel Gatuno :3"
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
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
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'unirse'
              ? '¿Desea crear a una Sala?'
              : "¿Desea unirse a una Sala?"}
          </Anchor>
          <Button type="submit" radius="xl" onClick={() => type ==='crear' ? crearSala(form.values.id, form.values.name): unirseSala(form.values.id, form.values.name)}>
            { upperFirst(type)
            }
          </Button>
        </Group>
      </form>
    </Paper>
  );

  async function crearSala(creador_id:number, nombre_sala: string){
    
    try{
      const data = await crear({ creador_id, nombre_sala });
      console.log(data.id)
      fetchSalas(creador_id);
      setActual(data);
      navigate(Rutas.chats + `/${data.id}`);
      notifications.show({
				title: "Exitoso",
				color: "green",
				message: "Se creo la sala exitosamente, su código es " + data.id,
			});
    }catch (error: any) {
			let mensaje = "Ingrese el nombre de la Sala";
			if (error.message === "Failed to fetch") {
				mensaje = "Error de conexión, intente de nuevo";
			}

			notifications.show({
				title: "Error",
				color: "red",
				message: mensaje,
			});
		}
  }
  async function unirseSala(usuario_id:number, sala_id: string){
    try{
      const data = await unirse({ usuario_id, sala_id });
      fetchSalas(usuario_id);
      navigate(Rutas.chats + `/${sala_id}`);
      notifications.show({
				title: "Exitoso",
				color: "green",
				message: "Te has unido a la sala",
			});
    }catch (error: any) {
			let mensaje = "Código de sala incorrecto";
			if (error.message === "Failed to fetch") {
				mensaje = "Error de conexión, intente de nuevo";
			}

			notifications.show({
				title: "Error",
				color: "red",
				message: mensaje,
			});
		}
  }
}
