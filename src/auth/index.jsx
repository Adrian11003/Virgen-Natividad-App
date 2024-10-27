import React, { useContext, useState } from 'react';
import { SafeAreaView, TextInput, View, Image, Text, Pressable, ActivityIndicator, useWindowDimensions, ImageBackground } from 'react-native';
import { AuthContext } from '../core/context/authContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../core/context/themeContext';  // Ajusta la ruta del ThemeContext
import { Button, Snackbar } from 'react-native-paper';

export const LoginScreen = () => {
  const [identificador, setIdentificador] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { handleLogin, loading } = useContext(AuthContext);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const { theme, toogleThemeType, isDarkTheme, themeType } = useTheme();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const onLoginPress = () => {
    if (!identificador) {
      setSnackbarMessage('El campo de identificador no puede estar vacío');
      setSnackbarVisible(true);
      return;
    }

    if (!contrasena || contrasena.length <= 4) {
      setSnackbarMessage('La contraseña debe tener más de 4 caracteres y no puede estar vacía');
      setSnackbarVisible(true);
      return;
    }

    handleLogin(identificador, contrasena);
  };

  const isMediumScreen = width >= 768;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{
        flexDirection: isMediumScreen ? 'row' : 'column',
        height: '100%',
        backgroundColor: themeType === 'light' ? '#fff' : '#000'
      }}>
        {/* Sección de Imagen */}
        <View style={{
          flex: isMediumScreen ? 1 : 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: isMediumScreen ? '50%' : '100%',
          backgroundColor: isMediumScreen ? 'transparent' : theme.colors.surface
        }}>
          {isMediumScreen ? (
            <ImageBackground
              source={{ uri: 'https://img.freepik.com/vector-gratis/fondo-azul-degradado_23-2149337036.jpg' }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: 80
              }}
              resizeMode="cover"
            >
              <Image
                source={require("../assets/images/logo.png")}
                style={{ width: 100, height: 100, marginBottom: 20 }}
                resizeMode="contain"
              />
              <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold', textAlign: 'center' }}>
                Virgen Natividad
              </Text>
            </ImageBackground>
          ) : (
            <Image
              source={require("../assets/images/logo.png")}
              style={{ width: 100, height: 100, marginBottom: 20 }}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Sección de Color y Bienvenido */}
        <View style={{
          flex: isMediumScreen ? 1 : 1,
          alignItems: 'center',
          width: isMediumScreen ? '50%' : '100%',
          padding: 24,
          backgroundColor: theme.colors.surface,
          justifyContent: 'center'
        }}>
          <Text style={{
            marginBottom: 16,
            fontSize: isMediumScreen ? 40 : 36,
            textAlign: 'center',
            color: isDarkTheme ? theme.colors.text : theme.colors.primary,
            fontWeight: 'bold'
          }}>
            ¡Bienvenido de nuevo!
          </Text>

          <View style={{ width: '100%', marginBottom: 24 }}>
            <TextInput
              value={identificador}
              onChangeText={setIdentificador}
              style={{
                width: '100%',
                marginBottom: 12,
                backgroundColor: theme.colors.surface,
                borderWidth: 1,
                borderColor: theme.colors.border,
                padding: 12,
                borderRadius: 16,
                color: isDarkTheme ? theme.colors.text : theme.colors.primary
              }}
              placeholder="Nro. Documento"
              placeholderTextColor={theme.colors.placeholder}
            />
            <TextInput
              value={contrasena}
              onChangeText={setContrasena}
              style={{
                width: '100%',
                marginBottom: 12,
                backgroundColor: theme.colors.surface,
                borderWidth: 1,
                borderColor: theme.colors.border,
                padding: 12,
                borderRadius: 16,
                color: isDarkTheme ? theme.colors.text : theme.colors.primary
              }}
              placeholder="Contraseña"
              secureTextEntry
              placeholderTextColor={theme.colors.placeholder}
            />
          </View>

          <Pressable
            style={{
              backgroundColor: theme.colors.primary,
              width: '100%',
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 50
            }}
            onPress={onLoginPress}
          >
            <Text style={{ color: theme.colors.onPrimary, fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
              Ingresar
            </Text>
          </Pressable>

          <Pressable
            style={{
              marginTop: 16,
              backgroundColor: isDarkTheme ? theme.colors.secondary : theme.colors.primary,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 20
            }}
            onPress={toogleThemeType}
          >
            <Text style={{ color: theme.colors.onPrimary, textAlign: 'center' }}>
              Cambiar a {isDarkTheme ? 'Modo Día' : 'Modo Noche'}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          action={{
            label: 'Cerrar',
            onPress: () => setSnackbarVisible(false)
          }}
          style={{
            width: '50%',
            alignSelf: 'center'
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};
