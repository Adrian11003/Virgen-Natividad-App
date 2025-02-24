import { createContext, useState } from 'react';
import { getBimestresRequest } from '../api/bimestre';
import { 
  changeNotaStateProcessedRequest, 
  createNotaRequest, updateNotaRequest,
  getNotaByEstudianteCursoBimestrePeriodoRequest,
  getNotaByEstudianteCursoBimestreSeccionTipoNotaRequest,
  changeNotaStateNullRequest
} from '../api/notas';
import { 
  createSolicitudNotaRequest, 
  getSolicitudNotaRequest,
  deleteSolicitudNotaRequest
} from '../api/solicitud-nota';
import { 
  getEstudianteCursoPeriodoByIdRequest,
  getEstudianteCursoPeriodoByEstudiantePeriodoRequest,
  getPeriodosByEstudianteRequest
} from '../api/estudiante-curso-periodo'
import { getSeccionesCursosByDocenteRequest } from '../api/seccion-curso-docente';

export const NotasContext = createContext();

export const NotasProvider = ({ children }) => {
  const [error, setError] = useState(null);
  
  const getBimestres = async () => {
    try {
      const { data } = await getBimestresRequest();
      return data
    } catch (error) {
      console.log(error)
      setError(error)
    }
  };

  const getSeccionesCursosByDocente = async (docenteId) => {
    try {
      const { data } = await getSeccionesCursosByDocenteRequest(docenteId);
      return data
    } catch (error) {
      console.log(error)
      setError(error)
    }
  };

  const createNota = async (nota) => {
    try {
      const { data } = await createNotaRequest(nota);
      return data
    } catch (error) {
      console.log(error)
      setError(error)
    }
  };

  const updateNota = async (id, nota) => {
    try {
      const { data } = await updateNotaRequest(id, nota)
      return data
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const getNotasByEstudianteCursoBimestreSeccionTipoNota = async (
    estudianteId, cursoId, bimestreId, seccionId, tipoNota
  ) => {
    try {
      const { data } = await getNotaByEstudianteCursoBimestreSeccionTipoNotaRequest(
        estudianteId, cursoId, bimestreId, seccionId, tipoNota
      );
      return data
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const createSolicitudNota = async (dataSolicitudNota) => {
    try {
      const { data } = await createSolicitudNotaRequest(dataSolicitudNota);
      return data
    } catch (error) {
      console.log(error)
      throw error; 
    }
  }

  const changeNotaStateNull = async (notaId) => {
    try {
      const { data } = await changeNotaStateNullRequest(notaId);
      return data
    } catch (error) {
      console.log(error)
      throw error; 
    }
  }

  const changeNotaStateProcessed = async (notaId) => {
    try {
      const { data } = await changeNotaStateProcessedRequest(notaId);
      return data
    } catch (error) {
      console.log(error)
      throw error; 
    }
  }

  const deleteSolicitudNota = async (notaId) => {
    try {
      const { data } = await deleteSolicitudNotaRequest(notaId);
      return data
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  const getNotaByEstudianteCursoBimestrePeriodo = async (estudianteId, cursoId, bimestreId, periodoId) => {
    try {
      const { data } = await getNotaByEstudianteCursoBimestrePeriodoRequest(estudianteId, cursoId, bimestreId, periodoId);
      return data
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  const getSolicitudNota = async (docenteId, estudianteId, cursoId, seccionId, bimestreId, tipoNota) => {
    try {
      const { data } = await getSolicitudNotaRequest(docenteId, estudianteId, cursoId, seccionId, bimestreId, tipoNota);
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      throw error; 
    }
  }

  const getEstudianteCursoPeriodoById = async (id) => {
    try {
      const { data } = await getEstudianteCursoPeriodoByIdRequest(id);
      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const getEstudianteCursoPeriodoByEstudiantePeriodo = async (estudianteId, periodoId) => {
    try {
      const { data } = await getEstudianteCursoPeriodoByEstudiantePeriodoRequest(estudianteId, periodoId);
      return data
    } catch (error) {
      console.log(error)
      throw error; 
    }
  }

  const getPeriodosByEstudiante = async (estudianteId) => {
    try {
      const { data } = await getPeriodosByEstudianteRequest(estudianteId);
      return data
    } catch (error) {
      console.log(error)
      throw error; 
    }
  }

  return (
    <NotasContext.Provider 
      value={{ 
        error,
        createNota,
        updateNota,
        getBimestres,
        getSolicitudNota,
        createSolicitudNota,
        deleteSolicitudNota,
        getSeccionesCursosByDocente,
        getNotaByEstudianteCursoBimestrePeriodo,
        getNotasByEstudianteCursoBimestreSeccionTipoNota,
        changeNotaStateProcessed,
        changeNotaStateNull, 
        getEstudianteCursoPeriodoById,
        getEstudianteCursoPeriodoByEstudiantePeriodo,
        getPeriodosByEstudiante
      }}
    >
      {children}
    </NotasContext.Provider>
  );
}