const obtenerFechaActual = () => {
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const año = fecha.getFullYear();

  return `${dia}-${mes}-${año}`;
};
  
export default obtenerFechaActual;

// 30-10-2024