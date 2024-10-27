import { useContext, useState } from 'react';
import { SafeAreaView, View, Image, Text, Pressable, ActivityIndicator, ImageBackground, StatusBar } from 'react-native';
import { AuthContext } from '../core/context/authContext';
import { useTheme } from '../core/context/themeContext';
import { Snackbar, TextInput } from 'react-native-paper';
import isMediumScreen from '../shared/constants/screen-width/md';

const imagenFondo = require('../assets/images/fondo.jpg');
const logo = require('../assets/images/logo.png');
const logoBlanco = require('../assets/images/logoInvertido.png');

const Logo = () => {
  const { theme, isDarkTheme } = useTheme();
  return (
    <View style={{ alignItems: 'center', marginBottom: 20 }}>
      <Image
        source={ isDarkTheme ? logoBlanco : logo }
        style={{ width: 100, height: 100, marginBottom: 20 }}
        resizeMode="contain"
      />
      <Text style={{ color: isMediumScreen ? 'white' : theme.colors.paperText, fontSize: 36, fontWeight: '500', textAlign: 'center' }}>
        Colegio Virgen de la Natividad
      </Text>
    </View>
  );
};

export const LoginScreen = () => {
  const [identificador, setIdentificador] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { handleLogin, loading } = useContext(AuthContext);
  const { theme, themeType, isDarkTheme, toogleThemeType } = useTheme();
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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isMediumScreen ? "#000" : theme.colors.background }}>
      <StatusBar 
        barStyle={isMediumScreen ? 'light-content' : (themeType === 'light' ? 'dark-content' : 'light-content') } 
        backgroundColor={isMediumScreen ? '#000' : theme.colors.background} 
      />
      <View style={{
        flexDirection: isMediumScreen ? 'row' : 'column',
        height: '100%',
      }}>
        {/* Sección de Imagen */}
        <View style={{
          flex: isMediumScreen ? 1 : 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: isMediumScreen ? '50%' : '100%',
          overflow: 'hidden'
        }}>
          {isMediumScreen &&
            <ImageBackground
              source={imagenFondo}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
              }}
              resizeMode="cover"
            >
              <Logo />
            </ImageBackground>
          }
        </View>

        {/* Sección de Color y Bienvenido */}
        <View style={{
          flex: isMediumScreen ? 1 : 1,
          alignItems: 'center',
          width: isMediumScreen ? '50%' : '100%',
          paddingHorizontal: 24,
          backgroundColor: theme.colors.surface,
          justifyContent: 'center',
        }}>
          {isMediumScreen ? (
            <Text style={{
              marginBottom: 16,
              fontSize: 36,
              textAlign: 'center',
              color: theme.colors.paperText,
              fontWeight: '500'
            }}>
              ¡Bienvenido de nuevo!
            </Text>
            ) : (
            <Logo />
          )}

          <View style={{ width: '100%', marginBottom: 40, marginTop: 20 }}>
            <TextInput
              label="Nro. Documento"
              value={identificador}
              onChangeText={text => setIdentificador(text)}
              mode="outlined"
            />
            <View style={{ marginBottom: 15 }}></View>
            <TextInput
              label="Contraseña"
              value={contrasena}
              onChangeText={text => setContrasena(text)}
              mode="outlined"
            />
          </View>


          <Pressable
            style={{
              backgroundColor: theme.colors.loginButton,
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
            width: isMediumScreen ? '50%' : '90%',
            alignSelf: 'center'
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};
