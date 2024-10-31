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
  getResumenAsistenciaRequest
} from '../api/asistencia'

export const AsistenciaContext = createContext();

export const AsistenciaProvider = ({ children }) => {
  const [semanas, setSemanas] = useState([]);
  const [resumenesAsistencia, setResumenesAsistencia] = useState([]);
  const [resumenAsistencia, setResumenAsistencia] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
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
      const response = await createResumenAsistenciaRequest(createData);
      getResumenesAsistenciaBySeccion(response.data.seccion._id);
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
      console.log(data)
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

  const getResumenAsistencia = async (seccionId, fecha) => {
    setLoading(true);
    try {
      return await getResumenAsistenciaRequest(seccionId, fecha);
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
      return await createAsistenciaRequest(createData);
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

  const getAsistenciasBySeccionFecha = async (seccionId, fecha) => {
    setLoading(true);
    try {
      const response = getAsistenciasBySeccionFechaRequest(seccionId, fecha);
      console.log(response)
      // console.log(data)
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