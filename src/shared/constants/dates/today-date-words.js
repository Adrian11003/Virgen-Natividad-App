const today = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
const currentDate = today.toLocaleDateString('es-ES', options);

export default currentDate;

// miércoles, 30 de octubre de 2024