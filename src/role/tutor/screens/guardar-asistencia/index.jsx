import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import fechaFormateada from '../../../../shared/constants/today-dateTime';

export const GuardarAsistencia = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View>
        <Text>Semana: </Text>
        <Text>Fecha: {fechaFormateada}</Text>
        <Button onPress={() => navigation.goBack()}>
          Volver a Gestionar Asistencia
        </Button>
      </View>
    </View>
  )
}