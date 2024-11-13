export default function formatMonth(date) {
  const d = new Date(date);
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  const month = d.getUTCMonth();
  
  return monthNames[month];
}