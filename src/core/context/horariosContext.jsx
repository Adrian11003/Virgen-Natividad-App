import { createContext, useState } from 'react';
import { getHorariosByDocenteCursoRequest, getHorariosBySeccionGradoRequest } from '../api/horarios';

export const HorariosContext = createContext();

export const HorariosProvider = ({ children }) => {
  const [horarios, setHorarios] = useState({});
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const { data } = await getHorariosByDocenteCursoRequest(docenteId, cursoId);
      const horariosOrganizados = organizarHorarios(data);
      setHorarios(horariosOrganizados);
    } catch (err) {
      console.log(err.error.message);
    } finally {
      setLoading(false);
    }
  };

  const getHorariosByGradoSeccion = async (seccionId, gradoId) => {
    setLoading(true);
    try {
      const { data } = await getHorariosBySeccionGradoRequest(seccionId, gradoId);
      const horariosOrganizados = organizarHorarios(data);
      setHorarios(horariosOrganizados);
    } catch (err) {
      console.log(err.error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HorariosContext.Provider 
      value={{ 
        horarios, 
        loading, 
        getHorariosByDocenteCurso, 
        getHorariosByGradoSeccion 
      }}
    >
      {children}
    </HorariosContext.Provider>
  );
};