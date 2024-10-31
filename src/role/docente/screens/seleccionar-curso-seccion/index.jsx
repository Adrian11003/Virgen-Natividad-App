import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useContext, useEffect } from 'react';
import { NotasContext } from '../../../../core/context/notasContext';
import { AuthContext } from '../../../../core/context/authContext';
import { useTheme } from '../../../../core/context/themeContext';
import { Card, ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const SeleccionarCursoSeccion = () => {
  const { getSeccionesCursosByDocente, seccionCursoDocente, loading } = useContext(NotasContext);
  const { user } = useContext(AuthContext);
  const { theme, isDarkTheme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      getSeccionesCursosByDocente(user.perfil._id);
    }
  }, [user]);

  const handleNavigate = (item) => {
    navigation.navigate('Notas', { // Nombre del stack en tu Drawer
      screen: 'GestionarNotas', // Nombre de la pantalla dentro del stack
      params: {
        seccion: item.seccion,
        curso: item.curso
      },
    });
  };

  if (loading) {
    return <ProgressBar indeterminate />
  }

  return (
    <View style={{
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.backgroundColor,
      padding: 20,
      borderRadius: 10,
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: isDarkTheme ? theme.colors.text : theme.colors.primary,
        textAlign: 'center'
      }}>
        Gestionar Notas
      </Text>

      <FlatList
        data={seccionCursoDocente}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigate(item)}>
            <Card style={{
              marginVertical: 5,
              padding: 10,
              backgroundColor: theme.cardColor,
              borderRadius: 5,
              width: '100%',
            }}>
              <Text style={{ fontSize: 16, color: theme.colors.paperText, textAlign: 'center' }}>
                {item.curso.nombre} - {item.seccion.nombre}
              </Text>
              <Text style={{ fontSize: 16, color: theme.colors.paperText, textAlign: 'center' }}>
                Aula: {item.seccion.aula}
              </Text>
              <Text style={{ fontSize: 16, color: theme.colors.paperText, textAlign: 'center' }}>
                Docente: {item.docente.nombre} {item.docente.apellido}
              </Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
