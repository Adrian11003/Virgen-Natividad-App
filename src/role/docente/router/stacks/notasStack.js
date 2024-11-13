import { createStackNavigator } from '@react-navigation/stack';
import { GestionarNotas } from "../../screens/gestionar-notas/index";
import { SeleccionarCursoSeccion } from '../../screens/seleccionar-curso-seccion';

const Stack = createStackNavigator();

export const NotasStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SeleccionarCursoSeccion"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen 
        name="SeleccionarCursoSeccion" 
        component={SeleccionarCursoSeccion}
        options={{
          headerShown: true
        }}
      />
      <Stack.Screen 
        name="GestionarNotas" 
        component={GestionarNotas}
        options={{
          headerShown: true
        }}
      />
    </Stack.Navigator>
  );
};