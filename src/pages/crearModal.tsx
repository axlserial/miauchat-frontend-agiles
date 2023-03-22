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

export function ModalCrearSala(props: PaperProps) {
  const [type, toggle] = useToggle(['crear', 'unirse']);
  const form = useForm({
    initialValues: {
      name: '',
      terms: true,
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
           // value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />
          )}

			{type === 'crear' && (
            <TextInput
            required
            label="Nombre de Sala"
            placeholder= "Cuartel Gatuno :3"
           // value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
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
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
