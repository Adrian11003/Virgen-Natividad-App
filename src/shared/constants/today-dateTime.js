const fechaActual = new Date();

const fechaFormateada = fechaActual.toLocaleString('es-ES', {
day: '2-digit',
month: '2-digit',
year: 'numeric',
hour: '2-digit',
minute: '2-digit',
hour12: true,
});

export default fechaFormateada;