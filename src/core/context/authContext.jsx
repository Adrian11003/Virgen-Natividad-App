import { createContext, useState, useEffect } from 'react';
import { loginRequest } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(AsyncStorage.getItem('auth-user'));
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem('auth-token');
        const userData = await AsyncStorage.getItem('auth-user');
        const expiration = await AsyncStorage.getItem('auth-expiration');

        const now = Date.now();
        if (expiration && now >= parseInt(expiration)) {
          await AsyncStorage.multiRemove(['auth-token', 'auth-user', 'auth-expiration']);
          setUser(null);
          setAuthToken(null);
          setIsAuthenticated(false);
        } else if (token && userData) {
          setUser(JSON.parse(userData));
          setAuthToken(token);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false); 
      }
    };

    checkAuthState();
  }, []);

  const handleLogin = async (identificador, contrasena, navigation) => {
    try {
      setLoading(true);
      const { data } = await loginRequest(identificador, contrasena);
      const dataUser = {
        email: data.email,
        perfil: data.perfil,
        rol: data.rol
      };

      const expirationTime = Date.now() + 3600000; 
      await AsyncStorage.setItem('auth-user', JSON.stringify(dataUser));
      await AsyncStorage.setItem('auth-token', data.token);
      await AsyncStorage.setItem('auth-expiration', expirationTime.toString());

      setUser(dataUser);
      setAuthToken(data.token);
      setIsAuthenticated(true);

      navigation.navigate('Drawer');
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(['auth-user', 'auth-token', 'auth-expiration']);
    setUser(null);
    setAuthToken(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        authToken, 
        isAuthenticated, 
        loading, 
        handleLogin, 
        handleLogout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};