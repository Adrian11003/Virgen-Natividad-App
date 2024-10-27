class Asistencia {
  constructor(tipo_evento_id, nombre, descripcion, disponibilidad = []) {
    this.tipo_evento_id = tipo_evento_id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.disponibilidad = disponibilidad;
  }
}