import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';

const UserInfo = ({ label, value }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </>
);

const Perfil = () => {
  const { user } = useContext(AuthContext);




  return (

    <View style={styles.container}>
      {user ? (
        <>
          {}
          {user.estudiante?.multimedia && (
            <Image 
            source={{ uri: user.perfil.multimedia.url }}
              style={styles.logo}
            />
          )}
         
         <UserInfo label={"Nombre:"} value={`${user.perfil.nombre} ${user.perfil.apellido}`} />
          <UserInfo label={"Rol:"} value={user.rol} />
          <UserInfo label={"Dirección:"} value={user.perfil.direccion} />
          <UserInfo label={"Número de Documento:"} value={user.perfil.numero_documento} />
          <UserInfo label="Correo electrónico:" value={user.email} />
        </>
      ) : (
        <Text style={styles.error}>No se ha encontrado información del usuario.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 150/2,
    borderColor: "white",
    borderWidth: 5,
    shadowColor: '#000',           
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3,           
    shadowRadius: 5,             
    elevation: 5,                

    
    
  }
});

export default Perfil;