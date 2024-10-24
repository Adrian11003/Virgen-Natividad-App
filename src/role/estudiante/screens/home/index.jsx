import { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { HorariosContext } from '../../../../core/context/horariosContext';
import { AuthContext } from '../../../../core/context/authContext';
import { useTheme } from '../../../../core/context/themeContext';
import { Horario } from '../../../../shared/components/horario/index';
import currentDate from '../../../../shared/constants/today-date';
import isMediumScreen from '../../../../shared/constants/screen-width/md';
import { ProgressBar } from 'react-native-paper';
import { Banner } from '../../../../shared/components/banner';

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
    <View style={{ width: '100%', maxWidth: 1300, marginVertical: 15, marginHorizontal: 'auto', marginBottom: 40 }}>
      <Text style={{ color: theme.colors.paperText, marginHorizontal: 20, fontSize: 15, marginBottom: 15 }}>
        Hola <Text style={{ fontWeight: 'bold' }}>{user.perfil.nombre}</Text>, hoy es {currentDate}.
      </Text>
      <View style={{ marginBottom: 65 }}>
        <ScrollView style={{ height: '80vh', marginBottom: 40 }}>
          <View style={{ 
            padding: 16,
            marginTop: -15,
            width: isMediumScreen ? '50%' : '100%',
          }}>
            <Horario horarios={horarios} rol={user.rol} />
          </View>

          <View style={{ 
            display: isMediumScreen ? 'grid' : 'flex',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginHorizontal: 20,
            marginBottom: 10
          }}>
            <Banner source={require('../../../../assets/images/fondaco.jpg')}/>
            <Banner text="B" />
            <Banner text="C" />
            <Banner text="D" />
            <Banner text="E" />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
