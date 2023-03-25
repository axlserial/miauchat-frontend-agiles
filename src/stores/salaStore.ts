import { create } from "zustand";
import { Sala } from "../types";
import { getSalas } from "../services/salas";

type SalaStore = {
	salas: Sala[];
	fetchSalas: (id: number) => Promise<void>;
};

/*
 * Este hook es un store de zustand que contiene la información de las
 * salas a las que el usuario está inscrito.
 */
export const useSalaStore = create<SalaStore>((set) => ({
	salas: [],
	fetchSalas: async (id) => {
		// Se llama al servicio para obtener las salas del usuario.
		try {
			const salas = await getSalas(id);
			set({ salas });
		} catch (e) {
			// Si hay un error, se limpian las salas.
			set({ salas: [] });
		}
	},
}));
