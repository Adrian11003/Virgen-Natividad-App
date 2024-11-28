import { createStackNavigator } from '@react-navigation/stack';
import { GestionarNotas } from "../../screens/gestionar-notas/index";
import { SeleccionarCursoSeccion } from '../../screens/seleccionar-curso-seccion';

const Stack = createStackNavigator();

export const NotasStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SeleccionarCursoSeccion"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="SeleccionarCursoSeccion" 
        component={SeleccionarCursoSeccion}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="GestionarNotas" 
        component={GestionarNotas}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};