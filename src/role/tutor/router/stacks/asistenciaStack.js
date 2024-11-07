import { createStackNavigator } from '@react-navigation/stack';
import { GestionarAsistencia } from '../../screens/gestionar-asistencia/index';

const Stack = createStackNavigator();

export const AsistenciaStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="GestionarAsistencia"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen 
        name="GestionarAsistencia" 
        component={GestionarAsistencia}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="GuardarAsistencia" 
        component={GuardarAsistencia}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};