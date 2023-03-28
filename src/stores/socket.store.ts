import { create } from 'zustand';
import { Socket, io } from 'socket.io-client';
import { ApiUrl } from '../services/baseUrl';
import { Sala } from '../types';
import { Rutas } from '../routes';
import { NavigateFunction } from 'react-router-dom';

type SocketStore = {
	socket: Socket | null;
	setSocket: (
		idUsuario: number,
		salas: Sala[],
		fetchSalas: (id: number) => Promise<Sala[]>,
		setSalas: (salas: Sala[]) => void,
		setActual: (sala: Sala) => void,
		navi: NavigateFunction
	) => void;
	closeSocket: () => void;
};

/*
 * Este hook es un store de zustand que contiene la información de las
 * salas a las que el usuario está inscrito.
 */
export const useSocketStore = create<SocketStore>((set, get) => ({
	socket: null,
	setSocket: (idUsuario, salas, fetchSalas, setSalas, setActual, navi) => {
		const { socket } = get();

		// Si ya hay un socket, no se crea uno nuevo
		if (socket) {
			return;
		}

		const socketNuevo = io(ApiUrl, {
			query: {
				id: idUsuario
			}
		});

		socketNuevo.on('name-sala', async (sala: Sala) => {
			const idUrl = window.location.pathname.split('/').at(-1);

			await fetchSalas(idUsuario);

			if (idUrl && idUrl === sala.id) {
				setActual(sala);
			}
		});

		socketNuevo.on('deleted-sala', async (sala_id: string) => {
			const idUrl = window.location.pathname.split('/').at(-1);
			
			await fetchSalas(idUsuario);

			if (idUrl && idUrl === sala_id) {
				navi(Rutas.chats);
			}
		});

		socketNuevo.on('newed-admin', async (admin_id: number, sala_id: string) => {
			if (idUsuario != admin_id) return;

			await fetchSalas(idUsuario);

			const idUrl = window.location.pathname.split('/').at(-1);
			if (idUrl && idUrl === sala_id) {
				navi(Rutas.chats);
			}
		});

		set({ socket: socketNuevo });
	},
	closeSocket: () => {
		const { socket } = get();
		socket?.disconnect();
		set({ socket: null });
	}
}));
