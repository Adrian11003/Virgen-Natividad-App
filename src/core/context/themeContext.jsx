import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme, MD3LightTheme, MD3DarkTheme, StatusBar } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { paperDarkTheme } from '../../shared/constants/themes/paper-dark-theme';
import { paperLightTheme } from '../../shared/constants/themes/paper-light-theme';
import { 
  NavigationContainer, 
  DarkTheme as NavigationDarkTheme, 
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';

const lightTheme = {
  ...NavigationDefaultTheme,
  paperLightTheme, // Paleta añadida
};

const darkTheme = {
  ...NavigationDarkTheme,
  paperDarkTheme,
  colors: {
    ...DefaultTheme.colors,
    ...paperDarkTheme.colors
  }
};

const ThemeContext = React.createContext({
  theme: lightTheme,
  themeType: 'light',
  isDarkTheme: false,
  setThemeType: () => {},
  toogleThemeType: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider = ({children}) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState(colorScheme || 'light');

  const toogleThemeType = useCallback(() => {
    setThemeType((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const isDarkTheme = useMemo(() => themeType === 'dark', [themeType]);
  const theme = useMemo(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme]
  );

  return (
    <>
      {/* Cambia el estilo de la barra de estado basado en el tema */}
      <StatusBar 
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.colors.background} 
      />
      <NavigationContainer theme={theme}>
        <PaperProvider theme={theme}>
          <ThemeContext.Provider 
            value={{ 
              theme, 
              themeType, 
              isDarkTheme, 
              setThemeType, 
              toogleThemeType 
            }}
          > 
            {children}
          </ThemeContext.Provider>
        </PaperProvider>
      </NavigationContainer>
    </>
  );
};
