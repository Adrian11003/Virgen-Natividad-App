import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './core/context/authContext';
import { ProtectedRoute } from './core/context/protectedRoute';
import { LoginScreen } from './auth/index'

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Drawer" component={ProtectedRoute} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}