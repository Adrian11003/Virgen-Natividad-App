import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme, MD3LightTheme, MD3DarkTheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { paperDarkTheme } from '../../shared/constants/themes/paper-dark-theme';
import { paperLightTheme } from '../../shared/constants/themes/paper-light-theme';
import { 
  NavigationContainer, 
  DarkTheme as NavigationDarkTheme, 
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';

const lightTheme = {
  ...NavigationDefaultTheme,
  ...paperLightTheme, // Paleta añadida
  colors: {
    ...NavigationDefaultTheme.colors,
    ...paperLightTheme.colors // Paleta añadida
  }
};

const darkTheme = {
  ...NavigationDarkTheme,
  ...paperDarkTheme, // Paleta añadida
  colors: {
    ...NavigationDarkTheme.colors,
    ...paperDarkTheme.colors // Paleta añadida
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
  );
};
