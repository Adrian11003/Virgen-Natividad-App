import React, { useContext } from 'react';
import { View, Text, Image, useWindowDimensions,ScrollView } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { useTheme } from '../../../../core/context/themeContext';
import { Card } from 'react-native-paper';

const Perfil = () => {
  const { user } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const { theme, isDarkTheme } = useTheme();
  const isMediumScreen = width >= 768;

  const UserInfo = ({ label, value }) => (
    <View style={{
      flex: 1,
      marginHorizontal: 5,
      alignItems: 'center',
      marginBottom: isMediumScreen ? 0 : 20, 
    }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: isDarkTheme ? theme.colors.text : theme.colors.primary, textAlign: 'center' }}>
        {label}
      </Text>
      <Text style={{ fontSize: 16, color: theme.colors.paperText, textAlign: 'center' }}>
        {value}
      </Text>
    </View>
  );

  return (
      <ScrollView>
        <View style={{ flex: 1, padding: 20 }}>
      <Card style={{ padding: 20, marginHorizontal: isMediumScreen ? 50 : 0 }}>
        <View style={{ flexDirection: isMediumScreen ? 'row' : 'column', alignItems: 'center' }}>
          <View style={{ marginBottom: 10, alignItems: 'center', marginRight: isMediumScreen ? 100 : 0, marginBottom: isMediumScreen ? 0 : 40 }}>
            <Image
              style={{ height: 110, width: 110, borderRadius: 55 }}
              source={{ uri: user.perfil.multimedia.url }}
            />
            <Text style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: isDarkTheme ? theme.colors.text : theme.colors.primary,
              marginTop: 10,
              textAlign: 'center'
            }}>
              {user.perfil.nombre} {user.perfil.apellido}
            </Text>
            <Text style={{
              fontSize: 16,
              color: theme.colors.paperText,
              marginTop: 5,
              textAlign: 'center'
            }}>
              {user.rol}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{
              flexDirection: isMediumScreen ? 'row' : 'column',
              justifyContent: isMediumScreen ? 'space-between' : 'center',
              alignItems: isMediumScreen ? 'flex-start' : 'center',
              marginBottom: 10
            }}>
              <UserInfo label="Grado" value={user.perfil.grado.nombre} />
              <UserInfo label="Periodo" value={user.perfil.periodo.anio} />
              <UserInfo label="Número de Documento" value={user.perfil.numero_documento} />
            </View>
            <View style={{
              flexDirection: isMediumScreen ? 'row' : 'column',
              justifyContent: isMediumScreen ? 'space-between' : 'center',
              alignItems: isMediumScreen ? 'flex-start' : 'center'
            }}>
              <UserInfo label="Sección" value={user.perfil.seccion.nombre} />
              <UserInfo label="Dirección" value={user.perfil.direccion} />
              <UserInfo label="Correo electrónico" value={user.email} />
            </View>
          </View>
        </View>
      </Card>  
    </View> 
    </ScrollView>
  );
};

export default Perfil;
