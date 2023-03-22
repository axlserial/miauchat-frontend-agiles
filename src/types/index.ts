// Tipo usuario
export type Usuario = {
	id: number;
	usuario: string;
	password?: string;
	foto_perfil: number;
};

export type Sala = {
	id: number;
	creador_id: number;
	nombre_sala: string;
	ultimo_mensaje?: Date;
}