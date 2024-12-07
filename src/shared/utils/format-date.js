export const formatearFecha = (fecha) => {
  const fechaObj = new Date(fecha);
  fechaObj.setHours(fechaObj.getHours() + 5);
  const dia = fechaObj.getDate().toString().padStart(2, '0');
  const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
  const anio = fechaObj.getFullYear();
  return `${dia}-${mes}-${anio}`;
};