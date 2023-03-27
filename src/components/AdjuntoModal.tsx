import { FileInput, Modal, Text, Tooltip, Flex, ActionIcon } from '@mantine/core';
import { IconTrashX } from '@tabler/icons-react';
import { IconUpload } from '@tabler/icons-react';

type AdjuntoModalProps = {
	archivo: File | null;
	setArchivo: (archivo: File | null) => void;
	visible: boolean;
	setVisible: (visible: boolean) => void;
};

const AdjuntoModal = ({
	archivo,
	setArchivo,
	visible,
	setVisible
}: AdjuntoModalProps) => {
	return (
		<Modal
			size="lg"
			opened={visible}
			onClose={() => setVisible(false)}
			title={<Text fw={500}>Selecciona el archivo adjunto</Text>}
			centered
		>
			<Flex justify="center" align="center" direction="row" p={25}>
				<FileInput
					value={archivo}
					onChange={f => {
						if (f) setArchivo(f);
					}}
					placeholder="MiauArchivo.pdf"
					icon={<IconUpload size={10} />}
					w="100%"
				/>

				<Tooltip.Floating label="Eliminar adjunto" color="blue">
					<ActionIcon
						onClick={() => setArchivo(null)}
						variant="transparent"
						color="red"
						radius="md"
						size="xl"
						w={60}
					>
						<IconTrashX />
					</ActionIcon>
				</Tooltip.Floating>
			</Flex>
		</Modal>
	);
};

export default AdjuntoModal;
