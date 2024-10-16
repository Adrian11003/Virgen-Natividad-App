import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './core/context/authContext';
import { HorariosProvider } from './core/context/horariosContext';
import { ProtectedRoute } from './core/context/protectedRoute';
import { LoginScreen } from './auth/index'
import { Horario } from './shared/components/horario';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <HorariosProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Drawer" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Drawer" component={ProtectedRoute} />
          </Stack.Navigator>
        </NavigationContainer>
      </HorariosProvider>
    </AuthProvider>
  );
}