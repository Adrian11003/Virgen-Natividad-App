import { createContext, useState } from 'react';
import { getSemanasRequest } from '../api/semanas';
import { 
  createResumenAsistenciaRequest,
  getResumenAsistenciaBySeccionRequest, 
  getResumenAsistenciaByIdRequest,  
  updateResumenAsistenciaRequest,
  deleteResumenAsistenciaRequest
} from '../api/resumen-asistencia';
import {
  createAsistenciaRequest,
  updateAsistenciaRequest,
  getFechasRequest,
  getAsistenciasBySeccionGradoPeriodoRequest
} from '../api/asistencia'

export const AsistenciaContext = createContext();

export const AsistenciaProvider = ({ children }) => {
  const [semanas, setSemanas] = useState([]);
  const [resumenesAsistencia, setResumenesAsistencia] = useState([]);
  const [resumenAsistencia, setResumenAsistencia] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const fetchSemanas = async () => {
    try {
      const response = await getSemanasRequest();
      setSemanas(response.data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false); 
    }
  };

  const ordenarSemanas = (semanas) => {
    return semanas.sort((a, b) => {
      const numeroA = parseInt(a.nombre.match(/\d+/)[0], 10);
      const numeroB = parseInt(b.nombre.match(/\d+/)[0], 10);
      return numeroA - numeroB;
    });
  };

  const getResumenesAsistenciaBySeccion = async (seccionId) => {
    setLoading(true);
    try {
      const { data } = await getResumenAsistenciaBySeccionRequest(seccionId);
      setResumenesAsistencia(data);
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  };

  const createResumenAsistencia = async (createData) => {
    setLoading(true);
    try {
      await createResumenAsistenciaRequest(createData);
      getResumenesAsistenciaBySeccion();
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  }

  const getResumenAsistenciaById = async (id) => {
    setLoading(true);
    try {
      const { data } = await getResumenAsistenciaByIdRequest(id);
      setResumenAsistencia(data);
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  }

  const updateResumenAsistencia = async (id, updateData) => {
    setLoading(true);
    try {
      await updateResumenAsistenciaRequest(id, updateData);
      getResumenesAsistenciaBySeccion();
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  }

  const deleteResumenAsistencia = async (id) => {
    setLoading(true);
    try {
      await deleteResumenAsistenciaRequest(id);
      getResumenesAsistenciaBySeccion();
    } catch (error) {
      console.log(error)
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getAsistenciasBySeccionGradoPeriodo = async (seccionId, gradoId, periodoId) => {
    setLoading(true);
    try {
      const { data } = await getAsistenciasBySeccionGradoPeriodoRequest(seccionId, gradoId, periodoId);
      setAsistencias(data);
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  }

  const createAsistencia = async (createData) => {
    setLoading(true);
    try {
      await createAsistenciaRequest(createData);
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  }

  const updateAsistencia = async (id, updateData) => {
    setLoading(true);
    try {
      await updateAsistenciaRequest(id, updateData);
      getAsistenciasBySeccionGradoPeriodo();
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  }

  const getFechasAsistencia = async (fecha) => {
    setLoading(true);
    try {
      const { data } = await getFechasRequest(fecha);
      setFechas(data);
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <AsistenciaContext.Provider 
      value={{ 
        loading,
        semanas: ordenarSemanas(semanas),
        fetchSemanas,
        getResumenesAsistenciaBySeccion,
        resumenesAsistencia,
        createResumenAsistencia,
        getResumenAsistenciaById,
        resumenAsistencia,
        updateResumenAsistencia,
        deleteResumenAsistencia,
        getAsistenciasBySeccionGradoPeriodo,
        asistencias,
        createAsistencia,
        updateAsistencia,
        getFechasAsistencia,
        fechas,
        error
      }}
    >
      {children}
    </AsistenciaContext.Provider>
  )
}