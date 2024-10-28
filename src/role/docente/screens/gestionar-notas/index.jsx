import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useContext, useEffect } from 'react';
import { NotasContext } from '../../../../core/context/notasContext';
import { AuthContext } from '../../../../core/context/authContext';
import { useTheme } from '../../../../core/context/themeContext';
import { Card } from 'react-native-paper';


export const GestionarNotas = () => {
  const { getSeccionCursoDocente, seccionGradoDocente, loadingNotas, error } = useContext(NotasContext);
  const { user } = useContext(AuthContext);
  const { theme, isDarkTheme } = useTheme();
  

  useEffect(() => {
    if (user) {
      getSeccionCursoDocente(user.perfil._id);
    }
  }, [user]);

  return (
    <View style={{
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.backgroundColor, 
      padding: 20,
      borderRadius: 10,
    }}>
      <Text style={{  fontSize: 16, fontWeight: 'bold', color: isDarkTheme ? theme.colors.text : theme.colors.primary, textAlign: 'center' }}>Gestionar Notas</Text>
      
      {loadingNotas ? (
        <ActivityIndicator size="large" color={theme.primaryColor} />
      ) : error ? (
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      ) : (
        <FlatList
          data={seccionGradoDocente}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card style={{
              marginVertical: 5,
              padding: 10,
              backgroundColor: theme.cardColor,
              borderRadius: 5,
              width: '100%',
            }}>
              <Text style={{fontSize: 16, color: theme.colors.paperText, textAlign: 'center'}}>{item.curso.nombre} - {item.seccion.nombre}</Text>
              <Text  style={{fontSize: 16, color: theme.colors.paperText, textAlign: 'center'}}>Aula: {item.seccion.aula}</Text>
              <Text  style={{fontSize: 16, color: theme.colors.paperText, textAlign: 'center'}}>Docente: {item.docente.nombre} {item.docente.apellido}</Text>
            </Card>
          )}
        />
      )}
    </View>
  );
};
