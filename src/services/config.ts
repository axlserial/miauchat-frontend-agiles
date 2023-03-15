import ky from "ky";

/**
 * Función que crea el objeto para hacer las peticiones HTTP al servidor
 * @param ruta string - Ruta base, ej 'usuarios', 'salas'
 * @returns Instancia del modulo para hacer peticiones
 */
const createApi = (ruta: string) =>
	ky.create({
		prefixUrl: `http://localhost:3146/api/v1/${ruta}`,
		credentials: "include",
	});

export default createApi;
