import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { loginRequest } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const loginHandler = async (identificador, contrasena) => {
    try {
      const userData = await loginRequest(identificador, contrasena);
      setUser(userData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logoutHandler = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };
  if (loading) {
    return <Text>AQUI VA ALGGO</Text>;
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};