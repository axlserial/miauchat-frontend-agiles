import { getAdjunto } from '../services/mensajes';

/**
 * Función que descarga un archivo adjunto
 * @param nombre_server string - Nombre del archivo en el servidor
 * @param nombre_archivo string - Nombre del archivo que se mostrará al usuario
 * @param extension string - Extensión del archivo
 */
export const downloadAdjunto = async (
	nombre_server: string,
	nombre_archivo: string,
	extension: string
) => {
	// Obtener el archivo adjunto
	const adjunto = await getAdjunto(nombre_server);

	// Crear un elemento <a> para descargar el archivo
	const url = URL.createObjectURL(adjunto);
	const link = document.createElement('a');

	// Asignar atributos al elemento <a>
	link.href = url;
	link.setAttribute('download', `${nombre_archivo}.${extension}`);

	// Insertar el elemento <a> en el DOM y hacer click
	document.body.appendChild(link);
	link.click();

	// Eliminar el elemento <a> del DOM
	link.parentNode?.removeChild(link);
};
