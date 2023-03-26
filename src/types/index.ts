// Tipo usuario
export type Usuario = {
	id: number;
	usuario: string;
	password?: string;
	foto_perfil: number;
};

export type Sala = {
	id: string;
	creador_id: number;
	nombre_sala: string;
	ultimo_mensaje?: Date;
};

export type Mensaje = {
	id?: number;
	contenido: string;
	emisor_id: number;
	fecha_enviado: Date;
	sala_id: string;
	es_adjunto: number;
};

export type Mensaje_with_author = {
	id?: number;
	usuario: string;
	contenido: string;
	emisor_id: number;
	fecha_enviado: Date;
	sala_id: string;
	es_adjunto: number;
};

export type Archivo_adjunto = {
	mensaje_id?: number;
	nombre_archivo: string;
	nombre_server?: string;
	extension: string;
};

export type Mensaje_sala = {
	mensaje: Mensaje_with_author;
	archivo?: Archivo_adjunto;
};
