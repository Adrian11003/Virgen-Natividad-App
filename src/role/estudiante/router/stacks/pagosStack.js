import { createStackNavigator } from '@react-navigation/stack';
import { Pago1 } from "../../screens/pago-1/index";
import { Pago2 } from '../../screens/pago-2/index';

const Stack = createStackNavigator();

export const PagosStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Pago1"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="Pago1" 
        component={Pago1}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Pago2" 
        component={Pago2}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};