import { ThemeContextProvider } from './core/context/themeContext';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './core/context/authContext';
import { HorariosProvider } from './core/context/horariosContext';
import { ProtectedRoute } from './core/context/protectedRoute';
import { LoginScreen } from './auth/index';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeContextProvider>
      <AuthProvider>
          <HorariosProvider>
            <Stack.Navigator initialRouteName="Drawer" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Drawer" component={ProtectedRoute} />
            </Stack.Navigator>
          </HorariosProvider>
      </AuthProvider>
    </ThemeContextProvider>
  );
}