import { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { HorariosContext } from '../../../../core/context/horariosContext';
import { AuthContext } from '../../../../core/context/authContext';
import { useTheme } from '../../../../core/context/themeContext';
import { Horario } from '../../../../shared/components/horario/index';
import currentDate from '../../../../shared/constants/today-date';
import isMediumScreen from '../../../../shared/constants/screen-width/md';
import { ProgressBar, Button } from 'react-native-paper';

export const Home = () => {
  const { horarios, getHorariosByGradoSeccion, loading } = useContext(HorariosContext);
  const { user } = useContext(AuthContext)
  const { theme, toogleThemeType } = useTheme()

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
    return <ProgressBar indeterminate />
  }

  return (
    <>
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: theme.colors.paperText, marginLeft: 20, fontSize: 15}}>
          Hola <Text style={{ fontWeight: 'bold' }}>{user.perfil.nombre}</Text>, <Text>hoy es {currentDate}. </Text>
        </Text>
      </View>
      <Button onPress={toogleThemeType}>aaaa</Button>
      <View style={{ 
        padding: 16,
        flexDirection: 'column',
        width: isMediumScreen ? '50%' : '100%',
        height: '100%',
        }}>
          <Horario horarios={horarios} rol={user.rol}/>
      </View>
    </>
  );
};