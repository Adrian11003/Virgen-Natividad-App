import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';

const UserInfo = ({ label, value }) => (
  <>
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{label}</Text>
    <Text style={{ fontSize: 20, color: '#333', marginBottom: 10 }}>{value}</Text>
  </>
);

const Perfil = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      {user.perfil.multimedia.url && (
        <Image
          style={{ marginBottom: 10, height: 80, width: 80, borderRadius: 40 }}
          source={{ uri: user.perfil.multimedia.url }}
        />
      )}
      <UserInfo label={"Nombre:"} value={`${user.perfil.nombre} ${user.perfil.apellido}`} />
      <UserInfo label={"Rol:"} value={user.rol} />
      <UserInfo label={"Dirección:"} value={user.perfil.direccion} />
      <UserInfo label={"Número de Documento:"} value={user.perfil.numero_documento} />
      <UserInfo label="Correo electrónico:" value={user.email} />
     
    </View>
  );
};

export default Perfil;
