import { createContext, useState } from 'react';
import { getHorariosByDocenteCursoRequest, getHorariosBySeccionGradoRequest } from '../api/horarios';

export const HorariosContext = createContext();

export const HorariosProvider = ({ children }) => {
  const [horarios, setHorarios] = useState({});
  const [loadingHorarios, setLoadingHorarios] = useState(false);

  const organizarHorarios = (data) => {
    const horariosPorDiaYHora = {};
    data.forEach(({ dia_semana, hora_inicio, hora_fin, curso }) => {
      const hora = `${hora_inicio} - ${hora_fin}`;
      horariosPorDiaYHora[dia_semana] = horariosPorDiaYHora[dia_semana] || {};
      horariosPorDiaYHora[dia_semana][hora] = curso.nombre;
    });
    return horariosPorDiaYHora;
  };

  const getHorariosByDocenteCurso = async (docenteId, cursoId) => {
    setLoadingHorarios(true);
    try {
      const { data } = await getHorariosByDocenteCursoRequest(docenteId, cursoId);
      const horariosOrganizados = organizarHorarios(data);
      setHorarios(horariosOrganizados);
    } catch (err) {
      console.log(err.error.message);
    } finally {
      setLoadingHorarios(false);
    }
  };

  const getHorariosByGradoSeccion = async (seccionId, gradoId) => {
    setLoadingHorarios(true);
    try {
      const { data } = await getHorariosBySeccionGradoRequest(seccionId, gradoId);
      const horariosOrganizados = organizarHorarios(data);
      setHorarios(horariosOrganizados);
    } catch (err) {
      console.log(err.error.message);
    } finally {
      setLoadingHorarios(false);
    }
  };

  return (
    <HorariosContext.Provider 
      value={{ 
        horarios, 
        loadingHorarios, 
        getHorariosByDocenteCurso, 
        getHorariosByGradoSeccion 
      }}
    >
      {children}
    </HorariosContext.Provider>
  );
};