import { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { HorariosContext } from '../../../../core/context/horariosContext';
import { AuthContext } from '../../../../core/context/authContext';
import { useTheme } from '../../../../core/context/themeContext';
import { Horario } from '../../../../shared/components/horario/index';
import currentDate from '../../../../shared/constants/today-date';
import isMediumScreen from '../../../../shared/constants/screen-width/md';
import { ProgressBar } from 'react-native-paper';

export const Home = () => {
  const { horarios, getHorariosByGradoSeccion, loading } = useContext(HorariosContext);
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  const [seccionId, setSeccionId] = useState(null);
  const [gradoId, setGradoId] = useState(null);

  useEffect(() => {
    setSeccionId(user.perfil.seccion._id);
    setGradoId(user.perfil.grado._id);
  }, [user]);

  useEffect(() => {
    if (seccionId && gradoId) {
      getHorariosByGradoSeccion(seccionId, gradoId);
    }
  }, [seccionId, gradoId]);

  if (loading) {
    return <ProgressBar indeterminate />;
  }

  return (
    <View style={{ width: '100%', maxWidth: 1300, marginVertical: 15, marginHorizontal: 'auto'}}>
      <Text style={{ color: theme.colors.paperText, marginHorizontal: 20, fontSize: 15, marginBottom: 15}}>
        Hola <Text style={{ fontWeight: 'bold' }}>{user.perfil.nombre}</Text>, hoy es {currentDate}.
      </Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ height: '100vh' }}>
        <View style={{ 
          padding: 16,
          marginTop: -15,
          flexDirection: 'column',
          width: isMediumScreen ? '50%' : '100%',
        }}>
          <Horario horarios={horarios} rol={user.rol} />
        </View>

        <View style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',  // Tres columnas
          gap: 12,
          marginHorizontal: 20,
        }}>
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 8, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.2, 
            shadowRadius: 4, 
            elevation: 3, 
            padding: 16, 
            minHeight: 300, 
            flex: 1, 
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>A</Text>
          </View>
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 8, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.2, 
            shadowRadius: 4, 
            elevation: 3, 
            padding: 16, 
            minHeight: 300, 
            flex: 1, 
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>B</Text>
          </View>
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 8, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.2, 
            shadowRadius: 4, 
            elevation: 3, 
            padding: 16, 
            minHeight: 300, 
            flex: 1, 
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>C</Text>
          </View>
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 8, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.2, 
            shadowRadius: 4, 
            elevation: 3, 
            padding: 16, 
            minHeight: 300, 
            flex: 1, 
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>C</Text>
          </View>
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 8, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.2, 
            shadowRadius: 4, 
            elevation: 3, 
            padding: 16, 
            minHeight: 300, 
            flex: 1, 
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>C</Text>
          </View>
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 8, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.2, 
            shadowRadius: 4, 
            elevation: 3, 
            padding: 16, 
            minHeight: 300, 
            flex: 1, 
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>C</Text>
          </View>
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 8, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.2, 
            shadowRadius: 4, 
            elevation: 3, 
            padding: 16, 
            minHeight: 300, 
            flex: 1, 
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>C</Text>
          </View>
          <View style={{ 
            backgroundColor: '#fff', 
            borderRadius: 8, 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.2, 
            shadowRadius: 4, 
            elevation: 3, 
            padding: 16, 
            minHeight: 300, 
            flex: 1, 
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>C</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
