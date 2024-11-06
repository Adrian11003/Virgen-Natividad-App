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
  getAsistenciasBySeccionFechaRequest,
  getResumenAsistenciaRequest,
  getAsistenciasByMesRequest
} from '../api/asistencia'

export const AsistenciaContext = createContext();

export const AsistenciaProvider = ({ children }) => {
  const [semanas, setSemanas] = useState([]);
  const [resumenesAsistencia, setResumenesAsistencia] = useState([]);
  const [resumenAsistencia, setResumenAsistencia] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [loadingResumen, setLoadingResumen] = useState(false); // Nuevo estado de carga específico
  const [loadingAsistencias, setLoadingAsistencias] = useState(false);
  const [asistenciasMes, setAsistenciasMes] = useState([]);//mes?

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
const getAsistenciasByMes = async (estudianteId,periodoId) => {
    setLoading(true);
    try {
      const { data } = await getAsistenciasByMesRequest(estudianteId,periodoId);
      setAsistenciasMes(data);
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false);
    }
  };

  const createResumenAsistencia = async (createData) => {
    try {
      const { data } = await createResumenAsistenciaRequest(createData)
      return data
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const getResumenAsistenciaById = async (id) => {
    setLoadingResumen(true); // Activar carga específica
    try {
      const { data } = await getResumenAsistenciaByIdRequest(id);
      return data
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoadingResumen(false); // Finalizar carga específica
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

  const getResumenAsistencia = async (seccionId, fecha) => {
    try {
      const { data } = await getResumenAsistenciaRequest(seccionId, fecha);
      return data
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const createAsistencia = async (createData) => {
    try {
      const { data } = await createAsistenciaRequest(createData);
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
      setError(error)
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

  const getAsistenciasBySeccionFecha = async (seccionId, fecha) => {
    try {
      const { data } = await getAsistenciasBySeccionFechaRequest(seccionId, fecha);
      return data.sort((a, b) => {
        const apellidoA = a.estudiante?.apellido?.toLowerCase() || '';
        const apellidoB = b.estudiante?.apellido?.toLowerCase() || '';
        return apellidoA.localeCompare(apellidoB);
      });
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <AsistenciaContext.Provider 
      value={{ 
        loading,
        loadingResumen,
        loadingAsistencias,
        semanas: ordenarSemanas(semanas),
        fetchSemanas,
        getResumenesAsistenciaBySeccion,
        getAsistenciasByMes,//mes?
        asistenciasMes,//mes? 
        resumenesAsistencia,
        createResumenAsistencia,
        getResumenAsistenciaById,
        resumenAsistencia,
        updateResumenAsistencia,
        deleteResumenAsistencia,
        getResumenAsistencia,
        createAsistencia,
        updateAsistencia,
        getAsistenciasBySeccionFecha,
        asistencias,
        error
      }}
    >
      {children}
    </AsistenciaContext.Provider>
  )
}