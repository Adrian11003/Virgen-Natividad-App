export const ordenarPorMeses = (data) => {
  const mesesOrdenados = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return data.sort((a, b) => 
    mesesOrdenados.indexOf(a.mes) - mesesOrdenados.indexOf(b.mes)
  );
};