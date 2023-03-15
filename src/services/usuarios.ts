import createApi from "./config";
import { Usuario } from "../types";

// Objeto para peticiones
const api = createApi("/usuarios");

// Servicio para registrar un usuario
export const signup = (signUpData: {
	usuario: string;
	password: string;
	foto_perfil: number;
}) => api.post("/registro", { json: signUpData }).json<Usuario>();
