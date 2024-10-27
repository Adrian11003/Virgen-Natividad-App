import { createContext, useState, useEffect } from 'react';
import { getSemanasRequest } from '../api/semanas';
import { 
  createResumenAsistenciaRequest,
  getResumenAsistenciaBySeccionRequest, 
  getResumenAsistenciaByIdRequest,  
  updateResumenAsistenciaRequest,
  deleteResumenAsistenciaRequest
} from '../api/resumen-asistencia';

export const AsistenciaContext = createContext();

export const AsistenciaProvider = ({ children }) => {
  const [semanas, setSemanas] = useState([]);
  const [resumenAsistencia, setResumenAsistencia] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchSemanas();
  }, [])

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

  const createResumenAsistenciaRequest = async (data) => {
    setLoading(true);
    try {
      const { data } = await createResumenAsistenciaRequest(data);
      setResumenAsistencia(data);
    } catch (err) {
      console.log(err.error.message);
    } finally {
      setLoading(false);
    }
  }

  const getResumenAsistenciaBySeccion = async (seccionId) => {
    setLoading(true);
    try {
      const { data } = await getResumenAsistenciaBySeccionRequest(seccionId);
      setResumenAsistencia(data);
    } catch (err) {
      console.log(err.error.message);
    } finally {
      setLoading(false);
    }
  };

  const getResumenAsistenciaByIdRequest = async (id) => {
    setLoading(true);
    try {
      const { data } = await getResumenAsistenciaByIdRequest(id);
      setResumenAsistencia(data);
    } catch (err) {
      console.log(err.error.message);
    } finally {
      setLoading(false);
    }
  }

  const updateResumenAsistenciaRequest = async (id, data) => {
    setLoading(true);
    try {
      const { data } = await updateResumenAsistenciaRequest(id, data);
      setResumenAsistencia(data);
    } catch (err) {
      console.log(err.error.message);
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
        getResumenAsistenciaBySeccion
      }}
    >
      {children}
    </AsistenciaContext.Provider>
  )
}