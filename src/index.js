import { ThemeContextProvider } from './core/context/themeContext';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './core/context/authContext';
import { HorariosProvider } from './core/context/horariosContext';
import { AsistenciaProvider } from './core/context/asistenciaContext';
import { EstudiantesProvider } from './core/context/estudiantesContext';
import { ProtectedRoute } from './core/context/protectedRoute';
import { LoginScreen } from './auth/index';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <HorariosProvider>
          <AsistenciaProvider>
            <EstudiantesProvider>
              <Stack.Navigator initialRouteName="Drawer" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Drawer" component={ProtectedRoute} />
              </Stack.Navigator>
            </EstudiantesProvider>
          </AsistenciaProvider>
        </HorariosProvider>
      </AuthProvider>
    </ThemeContextProvider>
  );
}