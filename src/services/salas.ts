import createApi from "./config";
import { Sala } from "../types";


const api = createApi("/salas")

//Servcio para crear una sala
export const crear = (signUpData: {
    creador_id: number;
	nombre_sala: string;
}) => {
    console.log('sala.ts')
    return api.post("crear", {json: signUpData}).json<Sala>()
    
};
