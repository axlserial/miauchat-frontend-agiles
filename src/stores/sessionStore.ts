import { create } from "zustand";
import { Usuario } from "../types";
import { whoami } from "../services/usuarios";

type SessionStore = {
	usuario: Usuario;
	fetchUsuario: (setLoading: (value: boolean) => void) => Promise<void>;
	setUsuario: (usuario: Usuario) => void;
	clearUsuario: () => void;
};

/*
 * Este hook es un store de zustand que contiene la información del usuario
 * que ha iniciado sesión.
 */
export const useSessionStore = create<SessionStore>((set) => ({
	usuario: { id: 0, usuario: "", foto_perfil: 0 },
	fetchUsuario: async (setLoading) => {
		// Se llama a la función whoami para obtener la información del usuario
		try {
			setLoading(true);
			const usuario = await whoami();
			set({ usuario });
		} catch (e) {
			// Si hay un error, se limpia la información del usuario
			set({ usuario: { id: 0, usuario: "", foto_perfil: 0 } });
		} finally {
			// Se desactiva el loading
			setLoading(false);
		}
	},
	setUsuario: (usuario) => set({ usuario }),
	clearUsuario: () => set({ usuario: { id: 0, usuario: "", foto_perfil: 0 } }),
}));
