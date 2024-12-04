import { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { useTheme } from '../../../../core/context/themeContext';
import { ProfileCard } from '../../../../shared/components/custom/card';

export const Perfil = () => {
  const { user } = useContext(AuthContext);
  const { theme, isDarkTheme } = useTheme();

  const fila1 = [
    { label: 'Grado', value: user.perfil.grado.nombre },
    { label: 'Periodo', value: user.perfil.periodo.anio },
    { label: 'Número de Documento', value: user.perfil.numero_documento },
  ];

  const fila2 = [
    { label: 'Telefono', value: user.perfil.telefono },
    { label: 'Dirección', value: user.perfil.direccion },
    { label: 'Correo electrónico', value: user.email },
  ];


  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 20 }}>
        <ProfileCard
          imageUri={user.perfil.multimedia.url}
          title={`${user.perfil.nombre} ${user.perfil.apellido}`}
          subtitle={user.rol}
          firstRowFields={fila1}
          secondRowFields={fila2}
          theme={theme}
          isDarkTheme={isDarkTheme}
        />
      </View>
    </ScrollView>
  );
};