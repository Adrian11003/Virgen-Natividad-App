import { useContext, useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { HorariosContext } from '../../../../core/context/horariosContext';
import { AuthContext } from '../../../../core/context/authContext';
import { Horario } from '../../../../shared/components/custom/horario/index';

const HorarioEstudiante = () => {
  const { horarios, getHorariosByGradoSeccion } = useContext(HorariosContext);
  const { user } = useContext(AuthContext)

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
    <View style={{ 
      padding: 16,
      flexDirection: 'column',
      width: isMediumScreen ? '50%' : '100%',
      height: '100%',
      }}>
        <Horario horarios={horarios} />
    </View>
  );
};

export default HorarioEstudiante;