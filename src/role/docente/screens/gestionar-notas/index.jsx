import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet,Dimensions ,ScrollView} from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { NotasContext } from '../../../../core/context/notasContext';
import { Button, ProgressBar } from 'react-native-paper';
import { useTheme } from '../../../../core/context/themeContext';
import isMediumScreen from '../../../../shared/constants/screen-width/md';
import { EstudiantesContext } from '../../../../core/context/estudiantesContext';
import { DataTable } from 'react-native-paper'; // Si usas DataTable directamente de react-native-paper


export const GestionarNotas = () => {
  const { getSeccionesCursosByDocente, secciones, cursos, loadingSeccionesCursos } = useContext(NotasContext);
  const { user } = useContext(AuthContext);
  const [docenteId, setDocenteId] = useState(null);
  const { estudiantes, getEstudiantesBySeccion, loadingEstudiantes } = useContext(EstudiantesContext);
  const { theme } = useTheme();
   // Paginación
   const [page, setPage] = useState(0);
   const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(8); // Cambia este número según tus necesidades
 
useEffect(() => {
   
      setDocenteId(user.perfil._id);
      
  }, [user]);

  // Llamamos a getSeccionesCursosByDocente cuando el docenteId esté disponible
  
  useEffect(() => {
    if (docenteId) {
      getSeccionesCursosByDocente(docenteId);
      console.log('DocenteId:', docenteId);
    }
  }, [docenteId]);

  useEffect(() => {
    // Asegúrate de que los datos hayan cargado antes de imprimirlos
    if (!loadingSeccionesCursos) {
      console.log('Secciones:', secciones); // Ver todas las secciones con sus nombres e IDs
      console.log('Cursos:', cursos); // Ver todos los cursos con sus nombres e IDs
      
      // Acceder a datos específicos (por ejemplo, ID de la primera sección y curso)
      if (secciones.length > 0) {
        console.log('Primer Sección - Nombre:', secciones[0].nombre, 'ID:', secciones[0].id);
      }
      if (cursos.length > 0) {
        console.log('Primer Curso - Nombre:', cursos[0].nombre, 'ID:', cursos[0].id);
      }
    }
  }, [secciones, cursos, loadingSeccionesCursos]);
  useEffect(() => {
    getEstudiantesBySeccion(secciones[0].id);
  }, [secciones]);

  const displayedEstudiantes = estudiantes.map(estudiante => ({
    nombreCompleto: `${estudiante.nombre} ${estudiante.apellido}`,
    dni: estudiante.numero_documento,
    
  }));

  if (loadingEstudiantes || loadingSeccionesCursos) {
    return <ProgressBar indeterminate />;
  }

 

  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, displayedEstudiantes.length);
  const paginatedData = displayedEstudiantes.slice(from, to);

  if (loadingEstudiantes || loadingSeccionesCursos) {
    return <ProgressBar indeterminate />;
  }

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={[styles.sectionText, { color: theme.colors.paperText }]}>
        Sección: {secciones[0].nombre} | Curso: {cursos[0].nombre}
      </Text>
    </View>

    <ScrollView horizontal style={styles.scrollView}>
      <DataTable style={styles.table}>
        <DataTable.Header 
          style={{ 
            width: isMediumScreen ? 1300 : 800, 
            borderBottomWidth: 1, 
            borderBottomColor: 'rgb(192, 192, 192)',
          }}
        >
          <DataTable.Title style={styles.tableHeaderCell}>Alumno</DataTable.Title>
          <DataTable.Title style={styles.tableHeaderCell}>DNI</DataTable.Title>
        
          <DataTable.Title style={styles.tableHeaderCell}>Acciones</DataTable.Title>
        </DataTable.Header>

        {paginatedData.map((estudiante, index) => (
          <DataTable.Row style={[styles.row, { width: isMediumScreen ? 1300 : 800 }]} key={index}>
            <DataTable.Cell style={styles.tableCell}>{estudiante.nombreCompleto}</DataTable.Cell>
            <DataTable.Cell style={styles.tableCell}>{estudiante.dni}</DataTable.Cell>
            <DataTable.Cell style={styles.actionCell}>
              <Button 
                mode="contained" 
                onPress={() => console.log("Editar Notas")} 
                style={styles.editButton}
                compact
              >
                Editar Notas
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(displayedEstudiantes.length / numberOfItemsPerPage)}
          onPageChange={newPage => setPage(newPage)}
          label={`${from + 1}-${to} de ${displayedEstudiantes.length}`}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={setNumberOfItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel={'Filas por página'}
          style={styles.pagination}
        />
      </DataTable>
    </ScrollView>
  </View>
);
};

// Estilos
const styles = StyleSheet.create({
container: {
  width: '100%',
  maxWidth: 1300,
  marginTop: 20,
  marginHorizontal: 'auto', // Centra el contenido horizontalmente
  paddingHorizontal: 10,
  alignItems: 'center', // Centra el contenido
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
  marginHorizontal: 20,
},
sectionText: {
  fontSize: 15,
  fontWeight: 'bold',
},
scrollView: {
  width: '50%', // Asegúrate de que el ScrollView ocupe todo el ancho
},
table: {
  width: '100%', // Asegúrate de que la tabla ocupe todo el ancho del contenedor
  borderWidth: 1,
  borderColor: '#e0e0e0',
  borderRadius: 5,
  overflow: 'hidden',
},
tableHeaderCell: {
  flex: 1,
  justifyContent: 'center',
  textAlign: 'center',
},
row: {
  borderBottomWidth: 1,
  borderBottomColor: 'rgb(192, 192, 192)',
},
tableCell: {
  flex: 1,
  justifyContent: 'center',
  paddingHorizontal: 5,
},
actionCell: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
editButton: {
  backgroundColor: '#1E88E5',
},
pagination: {
  justifyContent: 'flex-start',
  marginVertical: 7,
},
});

// ADRIAAAAAAN !!!!!!!!!!!!!!!

// import { View, Text, FlatList, ActivityIndicator } from 'react-native';
// import { useContext, useEffect } from 'react';
// import { NotasContext } from '../../../../core/context/notasContext';
// import { AuthContext } from '../../../../core/context/authContext';
// import { useTheme } from '../../../../core/context/themeContext';
// import { Card } from 'react-native-paper';


// export const GestionarNotas = () => {
//   const { getSeccionCursoDocente, seccionGradoDocente, loadingNotas, error } = useContext(NotasContext);
//   const { user } = useContext(AuthContext);
//   const { theme, isDarkTheme } = useTheme();
  

//   useEffect(() => {
//     if (user) {
//       getSeccionCursoDocente(user.perfil._id);
//     }
//   }, [user]);

//   return (
//     <View style={{
//       marginTop: 10,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: theme.backgroundColor, 
//       padding: 20,
//       borderRadius: 10,
//     }}>
//       <Text style={{  fontSize: 16, fontWeight: 'bold', color: isDarkTheme ? theme.colors.text : theme.colors.primary, textAlign: 'center' }}>Gestionar Notas</Text>
      
//       {loadingNotas ? (
//         <ActivityIndicator size="large" color={theme.primaryColor} />
//       ) : error ? (
//         <Text style={{ color: 'red' }}>Error: {error}</Text>
//       ) : (
//         <FlatList
//           data={seccionGradoDocente}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <Card style={{
//               marginVertical: 5,
//               padding: 10,
//               backgroundColor: theme.cardColor,
//               borderRadius: 5,
//               width: '100%',
//             }}>
//               <Text style={{fontSize: 16, color: theme.colors.paperText, textAlign: 'center'}}>{item.curso.nombre} - {item.seccion.nombre}</Text>
//               <Text  style={{fontSize: 16, color: theme.colors.paperText, textAlign: 'center'}}>Aula: {item.seccion.aula}</Text>
//               <Text  style={{fontSize: 16, color: theme.colors.paperText, textAlign: 'center'}}>Docente: {item.docente.nombre} {item.docente.apellido}</Text>
//             </Card>
//           )}
//         />
//       )}
//     </View>
//   );
// };
