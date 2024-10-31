import { ThemeContextProvider } from './core/context/themeContext';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './core/context/authContext';
import { HorariosProvider } from './core/context/horariosContext';
import { AsistenciaProvider } from './core/context/asistenciaContext';
import { EstudiantesProvider } from './core/context/estudiantesContext';
import { ProtectedRoute } from './core/context/protectedRoute';
import { LoginScreen } from './auth/index';
import { NotasProvider } from './core/context/notasContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <HorariosProvider>
          <AsistenciaProvider>
            <EstudiantesProvider>
              <NotasProvider>
                <Stack.Navigator initialRouteName="Drawer" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Drawer" component={ProtectedRoute} />
                </Stack.Navigator>
              </NotasProvider>
            </EstudiantesProvider>
          </AsistenciaProvider>
        </HorariosProvider>
      </AuthProvider>
    </ThemeContextProvider>
  );
}