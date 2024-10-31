const fechaActual = new Date();

const diaSemana = fechaActual.toLocaleString('es-ES', {
  weekday: 'short'
}).charAt(0).toUpperCase() + fechaActual.toLocaleString('es-ES', {
  weekday: 'short'
}).slice(1) + '.';

export default diaSemana;

// "Lun.", "Mar."