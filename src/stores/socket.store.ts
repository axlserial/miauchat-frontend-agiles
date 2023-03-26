import { create } from 'zustand';
import { Socket, io } from 'socket.io-client';
import { ApiUrl } from '../services/baseUrl';

type SocketStore = {
	socket: Socket | null;
	setSocket: (id: number) => void;
	closeSocket: () => void;
};

/*
 * Este hook es un store de zustand que contiene la información de las
 * salas a las que el usuario está inscrito.
 */
export const useSocketStore = create<SocketStore>((set, get) => ({
	socket: null,
	setSocket: id => {
		const socket = io(ApiUrl, {
			query: {
				id
			}
		});
		set({ socket });
	},
	closeSocket: () => {
		const { socket } = get();
		socket?.disconnect();
		set({ socket: null });
	}
}));
