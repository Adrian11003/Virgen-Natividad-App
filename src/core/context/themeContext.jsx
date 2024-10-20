import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { paperDarkTheme } from '../../shared/constants/themes/dark-theme';
import { paperLightTheme, reactNavigationLightTheme } from '../../shared/constants/themes/light-theme';
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

const lightTheme = {
  ...reactNavigationLightTheme,
  ...paperLightTheme,
  colors: {
    ...reactNavigationLightTheme.colors,
    ...paperLightTheme.colors,
  }
};

const darkTheme = {
  ...NavigationDarkTheme,
  ...paperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...paperDarkTheme.colors,
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
      <StatusBar 
        barStyle={'light-content'} 
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
