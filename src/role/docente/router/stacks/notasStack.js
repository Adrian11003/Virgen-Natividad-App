import { createStackNavigator } from '@react-navigation/stack';
import { GestionarNotas } from "../../screens/gestionar-notas/index";

const Stack = createStackNavigator();

export const NotasStack =()=>{
return (
    <Stack.Navigator
      initialRouteName="GestionarNotas"
      screenOptions={{
        headerShown: true,
      }}
    >
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