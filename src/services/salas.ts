import createApi from "./config";
import { Sala } from "../types";

const api = createApi("/salas");

//Servcio para crear una sala
export const crear = (signUpData: {
	creador_id: number;
	nombre_sala: string;
}) => {
	console.log("sala.ts");
	return api.post("crear", { json: signUpData }).json<Sala>();
};

//Servcio para unirse a una sala
export const unirse = (addUserData: {
	usuario_id: number;
	sala_id: string;
}) => {
	console.log("UnirASala.ts");
	return api.post("addParticipante", { json: addUserData });
};

//Servicio para cargar todas las salas
export const getSalas = (usuario_id: number) => {
	return api.get(`salas-usuario/${usuario_id}`).json<Sala[]>();
};

//Servicio para cambair nombre de la sala
export const cambiarNombreSala = (signUpData:{
	sala_id: string;
	nuevo_nombre: string;
}) => {
	return api.put("cambiarNombreSala", { json: signUpData }).json<Sala>();
};


//Servicio para eliminar participante
export const eliminarParticipante = (usuario_id: number, sala_id: string) => {
	return api.delete(`eliminar-participante/${usuario_id}/${sala_id}`)
}