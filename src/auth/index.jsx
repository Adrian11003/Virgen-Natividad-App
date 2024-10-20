import { SafeAreaView, TextInput, View, Image, Text, Pressable, ActivityIndicator } from 'react-native';
import { AuthContext } from '../core/context/authContext';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';

export const LoginScreen = () => {
  const [identificador, setIdentificador] = useState('');
  const [contrasena, setContrasena] = useState('');
  const { handleLogin, loading } = useContext(AuthContext);
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

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
          style={{ backgroundColor: '#0f172a', width: '100%', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 50 }}
          onPress={() => handleLogin(identificador, contrasena, navigation)}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Iniciar Sesión</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}