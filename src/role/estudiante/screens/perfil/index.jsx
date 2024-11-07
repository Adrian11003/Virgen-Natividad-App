import React, { useContext, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { useTheme } from '../../../../core/context/themeContext';
import ProfileCard from '../../../../shared/components/card/ProfileCard';
import { ApoderadosContext } from '../../../../core/context/apoderadosContext';

const Perfil = () => {
  const { getApoderado, apoderadosByEstudiante } = useContext(ApoderadosContext);
  const { user } = useContext(AuthContext);
  const { theme, isDarkTheme } = useTheme();

  useEffect(() => {
    getApoderado(user.perfil._id);
  }, [user]);
console.log(apoderadosByEstudiante)
  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 20, marginBottom: -20 }}>
        <ProfileCard
          imageUri={user.perfil.multimedia.url}
          title={`${user.perfil.nombre} ${user.perfil.apellido}`}
          subtitle={user.rol}
          firstRowFields={[
            { label: 'Grado', value: user.perfil.grado.nombre },
            { label: 'Periodo', value: user.perfil.periodo.anio },
            { label: 'Número de Documento', value: user.perfil.numero_documento },
          ]}
          secondRowFields={[
            { label: 'Sección', value: user.perfil.seccion.nombre },
            { label: 'Dirección', value: user.perfil.direccion },
            { label: 'Correo electrónico', value: user.email },
          ]}
          theme={theme}
          isDarkTheme={isDarkTheme}
        />
      </View>
      
      {apoderadosByEstudiante.map((apoderado) => (
        <View key={apoderado._id} style={{ flex: 1, padding: 20 ,marginBottom: -20}}>
          <ProfileCard
            title={`${apoderado.nombre} ${apoderado.apellido}`}
            subtitle="Apoderado"
            firstRowFields={[
              { label: 'Número', value: apoderado.numero },
              { label: 'Correo', value: apoderado.correo },
              { label: 'Dirección', value: apoderado.direccion },
            ]}
            secondRowFields={[
              { label: 'Número de Documento', value: apoderado.numero_documento },
              { label: 'Tipo de Documento', value: apoderado.documento.type },
              { label: 'Estado', value: apoderado.estudiante.estado },
            ]}
            theme={theme}
            isDarkTheme={isDarkTheme}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default Perfil;
