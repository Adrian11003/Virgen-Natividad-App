import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useEffect } from 'react';
import { loginRequest } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) setUser(JSON.parse(userData));
      setLoading(false);
    };
    loadUserData();
  }, []);

  const login = async (identificador, contrasena) => {
    try {
      const { data } = await loginRequest(identificador, contrasena);
      setUser(data);
      await AsyncStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
    }
  };

  const handleLogin = async (identificador, contrasena, navigation) => {
    try {
      const userData = await login(identificador, contrasena);
      if (userData) navigation.navigate('Drawer');
      else Alert.alert('Error', 'Rol no reconocido');
    } catch (error) {
      Alert.alert('Error de inicio de sesión', error.message);
    }
  };

  const handleLogout = async (navigation) => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };
  if (loading) {
    return <Text>AQUI VA ALGGO</Text>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};