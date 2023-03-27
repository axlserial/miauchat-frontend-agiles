import createApi from './config';
import { Mensaje_sala } from '../types';

const api = createApi('mensajes');

// Servicio para obtener los mensajes de una sala
export const getMensajes = (sala_id: string) => {
	return api.get(`mensajes-sala/${sala_id}`).json<Mensaje_sala[]>();
};

// Servicio para obtener un archivo adjunto
export const getAdjunto = (nombre_server: string) =>
	api.get(`adjunto/${nombre_server}`).blob();
