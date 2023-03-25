import ky from "ky";
import { ApiUrl } from "./baseUrl";

/**
 * Función que crea el objeto para hacer las peticiones HTTP al servidor
 * @param ruta string - Ruta base, ej 'usuarios', 'salas'
 * @returns Instancia del modulo para hacer peticiones
 */
const createApi = (ruta: string) =>
	ky.create({
		prefixUrl: `${ApiUrl}/api/v1/${ruta}`,
		credentials: "include",
	});

export default createApi;
