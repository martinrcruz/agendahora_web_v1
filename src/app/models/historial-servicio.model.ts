export interface HistorialAgenda {
    nombre: string,
    descripcion: string,
    fecha_entrada: string,
    fecha_salida: string,
    id_usuario_tecnico: number,
    id_cliente: number,
    id_vehiculo: number,
    id_usuario_cargo: number
}

export interface AgendaHora {
    id_hora_agenda: number,
    id_servicio: number,
    nombre: string,
    descripcion: string,
    fecha_entrada: string,
    fecha_salida: string,
    id_usuario_tecnico: number,
    id_cliente: number,
    id_vehiculo: number,
    id_usuario_cargo: 1
}