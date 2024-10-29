import React, { useCallback, useContext, useMemo, useState } from 'react';
import { StatusBar, Platform } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { paperDarkTheme, reactNavigationDarkTheme } from '../../shared/constants/themes/dark-theme';
import { paperLightTheme, reactNavigationLightTheme } from '../../shared/constants/themes/light-theme';
import { NavigationContainer } from '@react-navigation/native';

const lightTheme = {
  ...reactNavigationLightTheme,
  ...paperLightTheme,
  colors: {
    ...reactNavigationLightTheme.colors,
    ...paperLightTheme.colors,
  }
};

const darkTheme = {
  ...reactNavigationDarkTheme,
  ...paperDarkTheme,
  colors: {
    ...reactNavigationDarkTheme.colors,
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

const getPreferredTheme = () => {
  const currentHour = new Date().getHours();
  return (currentHour >= 6 && currentHour < 18) ? 'light' : 'dark';
};

export const ThemeContextProvider = ({children}) => {
  const preferredTheme = getPreferredTheme();
  const [themeType, setThemeType] = useState(preferredTheme || 'light');

  const toogleThemeType = useCallback(() => {
    setThemeType((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const isDarkTheme = useMemo(() => themeType === 'dark', [themeType]);
  const theme = useMemo(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme]
  );

  const barStyle = useMemo(() => {
    if (Platform.OS === 'ios') {
      return 'light-content';
    } else if (Platform.OS === 'android') {
      return isDarkTheme ? 'light-content' : 'dark-content'; 
    }
    return 'light-content'; 
  }, [isDarkTheme]);

  return (
    <>
      <StatusBar 
        barStyle={barStyle} 
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
              toogleThemeType,
              barStyle
            }}
          > 
            {children}
          </ThemeContext.Provider>
        </PaperProvider>
      </NavigationContainer>
    </>
  );
};
