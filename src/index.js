import { ThemeContextProvider, useTheme } from './core/context/themeContext';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './core/context/authContext';
import { HorariosProvider } from './core/context/horariosContext';
import { ProtectedRoute } from './core/context/protectedRoute';
import { LoginScreen } from './auth/index'
import { Text, View } from 'react-native';

import { Button } from 'react-native-paper';

const Stack = createStackNavigator();

const TestScreen = () => {
  const { toogleThemeType, themeType, isDarkTheme, theme } = useTheme()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Test Screen</Text>
      <Button mode="contained" onPress={toogleThemeType}>
        Toggle Theme
      </Button>
      <Button icon="camera" mode="contained" onPress={() => console.log('Camera pressed')}>
        Press me
      </Button>
    </View>
  )
}

export default function App() {
  return (
    // <AuthProvider>
      <ThemeContextProvider>
        <Stack.Navigator initialRouteName="Test" >  
          <Stack.Screen name="Test" component={TestScreen} />
        </Stack.Navigator>
      </ThemeContextProvider>
    // </AuthProvider>
  );
}

        {/* <HorariosProvider>
          <Stack.Navigator initialRouteName="Drawer" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Drawer" component={ProtectedRoute} />
          </Stack.Navigator>
        </HorariosProvider> */}