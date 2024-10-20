import { useContext, useEffect, useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { HorariosContext } from '../../../../core/context/horariosContext';
import { AuthContext } from '../../../../core/context/authContext';
import { useTheme } from '../../../../core/context/themeContext';
import { Horario } from '../../../../shared/components/horario/index';
import { Button } from 'react-native-paper';

export const Home = () => {
  const { horarios, getHorariosByGradoSeccion } = useContext(HorariosContext);
  const { user } = useContext(AuthContext)
  const { toogleThemeType, theme } = useTheme()

  const [seccionId, setSeccionId] = useState(null);
  const [gradoId, setGradoId] = useState(null);

  const screenWidth = Dimensions.get('window').width;
  const isMediumScreen = screenWidth >= 768; 

  useEffect(() => {
      setSeccionId(user.perfil.seccion._id);
      setGradoId(user.perfil.grado._id);
  }, [user]);
  
  useEffect(() => {
    if (seccionId && gradoId) {
      getHorariosByGradoSeccion(seccionId, gradoId);
    }
  }, [seccionId, gradoId]);

  return (
    <>
      <View>
        <Text style={{ color: theme.colors.paperText }}>
          Bienvenido {user.perfil.nombre}, {user.perfil.apellido}
        </Text>
        <Button mode="contained" onPress={toogleThemeType}>
          Cambiar Tema
        </Button>
      </View>
      <View style={{ 
        padding: 16,
        flexDirection: 'column',
        width: isMediumScreen ? '50%' : '100%',
        height: '100%',
        }}>
          <Horario horarios={horarios} />
      </View>
    </>
  );
};