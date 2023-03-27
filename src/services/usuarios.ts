import createApi from "./config";
import { Usuario } from "../types";

// Objeto para peticiones
const api = createApi("usuarios");

// Servicio para registrar un usuario
export const signup = (signUpData: {
	usuario: string;
	password: string;
	foto_perfil: number;
}) => api.post("registro", { json: signUpData }).json<Usuario>();

// Servicio para iniciar sesión
export const login = (loginData: { usuario: string; password: string }) =>
	api.post("sesion", { json: loginData }).json<Usuario>();

// Servicio para cerrar sesión
export const logout = () => api.get("sesion/cerrar");

// Servicio para obtener la información del usuario
export const whoami = () => api.get("whoami").json<Usuario>();
