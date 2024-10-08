import { useState, useContext } from 'react';
import { SafeAreaView, TextInput, View, Image, Text, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../core/context/authContext';

export const LoginScreen = () => {
  const [identificador, setIdentificador] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigation = useNavigation();
  const { loginHandler } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const userData = await loginHandler(identificador, contrasena);
      if (userData) {
        navigation.navigate('Drawer');
      } else {
        Alert.alert("Error", "Rol no reconocido");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error de inicio de sesión", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
      <View style={{ alignItems: 'center', padding: 24 }}>
        <Text style={{ marginBottom: 16, fontSize: 36, textAlign: 'center', color: '#0f172a', fontWeight: 'bold' }} >
          ¡Bienvenido!
        </Text>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 96, height: 96, marginBottom: 20 }}
          resizeMode="contain"
        />
        <View style={{ width: '100%', marginBottom: 24 }}>
          <TextInput
            value={identificador}
            onChangeText={setIdentificador}
            style={{
              width: '100%', marginBottom: 12, backgroundColor: 'white', borderWidth: 1,
              borderColor: '#d1d5db', padding: 12, borderRadius: 16
            }}

            placeholder="Username"
          />
          <TextInput
            value={contrasena}
            onChangeText={setContrasena}
            style={{
              width: '100%', marginBottom: 12, backgroundColor: 'white', borderWidth: 1,
              borderColor: '#d1d5db', padding: 12, borderRadius: 16
            }}
            placeholder="Password"
            secureTextEntry
          />
        </View >

        <Pressable
          style={{ color: '0f172a', width: '100%', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 50 }}
          onPress={handleLogin}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Iniciar Sesión</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}