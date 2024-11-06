import { createContext, useState, useEffect } from 'react';
import { getPeriodoRequest } from '../api/periodo';

export const PeriodoContext = createContext();

export const PeriodoProvider = ({ children }) => {
    const [periodo, setPeriodo] = useState({});
    const [loadingPeriodo, setLoadingPeriodo] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchPeriodo();
    }, []);
    
    const fetchPeriodo = async () => {
        try {
        const response = await getPeriodoRequest();
        setPeriodo(response.data);
        } catch (error) {
        console.log(error)
        setError(error)
        } finally {
        setLoadingPeriodo(false);
        }
    };
    
    return (
        <PeriodoContext.Provider value={{ 
        periodo, 
        loadingPeriodo,
        fetchPeriodo, 
        error 
        }}
        >
        {children}
        </PeriodoContext.Provider>
    );
    }