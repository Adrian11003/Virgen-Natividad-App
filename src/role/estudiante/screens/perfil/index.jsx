import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';

const UserInfo = ({ label, value }) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#666' }}>{label}</Text>
    <Text style={{ fontSize: 18, color: '#333' }}>{value}</Text>
  </View>
);

const Perfil = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5', alignItems: 'center' }}>
      {user.perfil.multimedia.url && (
        <View style={{
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
          borderRadius: 40,
        }}>
          <Image
            style={{ height: 80, width: 80, borderRadius: 40 }}
            source={{ uri: user.perfil.multimedia.url }}
          />
        </View>
      )}
      <View style={{
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      }}>
        <UserInfo label={"Nombre:"} value={`${user.perfil.nombre} ${user.perfil.apellido}`} />
        <UserInfo label={"Rol:"} value={user.rol} />
        <UserInfo label={"Dirección:"} value={user.perfil.direccion} />
        <UserInfo label={"Número de Documento:"} value={user.perfil.numero_documento} />
        <UserInfo label={"Correo electrónico:"} value={user.email} />
      </View>
    </View>
  );
};

export default Perfil;
