import { useContext, useState } from 'react';
import { SafeAreaView, View, Text, Pressable, ActivityIndicator, ImageBackground, StatusBar } from 'react-native';
import { AuthContext } from '../core/context/authContext';
import { useTheme } from '../core/context/themeContext';
import { TextInput } from 'react-native-paper';
import { LoginRequest } from '../core/models/shared/login';
import { useNavigation } from '@react-navigation/native';
import { Logo } from '../shared/components/custom/logo/index'
import { showSnackbar } from '../shared/components/custom/snackbar';
import isMediumScreen from '../shared/constants/screen-width/md';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
// import { firebaseConfig } from '../firebase-config';

const imagenFondo = require('../assets/images/fondo.jpg');

export const LoginScreen = () => {
  const [identificador, setIdentificador] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [flatTextSecureEntry, setFlatTextSecureEntry] = useState(true);
  const { handleLogin, loading, error } = useContext(AuthContext);
  const { theme, themeType, isDarkTheme } = useTheme();
  const { navigation } = useNavigation();

  // const app = initializeApp(firebaseConfig);
  // const auth = getAuth(app);

  // const handleCreateAccount = () => {
  //   if (email === "" || password === "") {
  //     Alert.alert("Please fill all the fields");
  //     return;
  //   }

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       console.log("Account created!");
  //       const user = userCredential.user;
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       Alert.alert(error.message);
  //     });
  // };

  // const handleSignIn = () => {
  //   if (email === "" || password === "") {
  //     Alert.alert("Please fill all the fields");
  //     return;
  //   }

  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log(user);
  //       navigation.navigate("Home", { email: user.email});
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       console.log(error.message);
  //       Alert.alert(error.message);
  //     });
  // };


  const onLoginPress = () => {
    if (!identificador) {
      showSnackbar('El Nro. Documento o Correo no puede estar vacío');
      return;
    }

    if (!contrasena) {
      showSnackbar('La contraseña no puede estar vacía');
      return;
    }

    const loginRequestInstance = new LoginRequest(identificador, contrasena);

    handleLogin(loginRequestInstance, navigation)
      .then(() => {
        console.log('Login successful');
      })
      .catch((err) => {
        showSnackbar(error.response.data.message);
      });
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
              label="Nro. de Documento o Correo"
              value={identificador}
              onChangeText={text => setIdentificador(text)}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon={"account"}
                  color={theme.colors.customIcon}
                  size={24}
                />
              }
            />
            <View style={{ marginBottom: 15 }}></View>
            <TextInput
              label="Contraseña"
              value={contrasena}
              onChangeText={text => setContrasena(text)}
              mode="outlined"
              secureTextEntry={flatTextSecureEntry}
              right={
                <TextInput.Icon
                  icon={flatTextSecureEntry ? 'eye' : 'eye-off'}
                  onPress={() => setFlatTextSecureEntry(!flatTextSecureEntry)} 
                  forceTextInputFocus={false}
                  color={ isDarkTheme && theme.colors.customIcon}
                />
              }
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
    </SafeAreaView>
  );
};
