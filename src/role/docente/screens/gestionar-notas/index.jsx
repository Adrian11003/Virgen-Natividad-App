import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet,Dimensions ,ScrollView} from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { NotasContext } from '../../../../core/context/notasContext';
import { Button, ProgressBar } from 'react-native-paper';
import { useTheme } from '../../../../core/context/themeContext';
import isMediumScreen from '../../../../shared/constants/screen-width/md';
import { EstudiantesContext } from '../../../../core/context/estudiantesContext';
import { DataTable } from 'react-native-paper'; // Si usas DataTable directamente de react-native-paper
import { useRoute } from '@react-navigation/native';
import { ModalNuevaNota } from '../../../../shared/components/modal/modal-notas/index';



export const GestionarNotas = () => {
  const { getSeccionesCursosByDocente, secciones, cursos, loadingSeccionesCursos } = useContext(NotasContext);
  const { user } = useContext(AuthContext);
  const { getEstudiantesBySeccion } = useContext(EstudiantesContext); // Consumimos el contexto
  const { theme } = useTheme();
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(8);
  const route = useRoute();
  const { seccion, curso } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [seccionCursoDocente, setSeccionCursoDocente] = useState([]);
  const [estudiantes, setEstudiantes] = useState(null);
  
  

  useEffect(() => {
    setLoading(true);
    getEstudiantesBySeccion(seccion._id)
      .then((dataEstudiante) => {
      const displayedEstudiantes = dataEstudiante ? dataEstudiante.map(estudiante => ({
        nombreCompleto:` ${estudiante.nombre} ${estudiante.apellido}`,
        dni: estudiante.numero_documento,
        id: estudiante._id,
      })) : [];
      
      setEstudiantes(displayedEstudiantes);
      setLoading(false);
    })
  }, []);



  if (loading) {
    return <ProgressBar indeterminate />;
  }

  // Manejo de la paginación
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, estudiantes.length);
  const paginatedData = estudiantes.slice(from, to);


  const hasEstudiantes = estudiantes && estudiantes.length > 0;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.sectionText, { color: theme.colors.paperText }]}>
          Sección: {seccion.nombre} | Curso: {curso.nombre}
        </Text>
      </View>

      {/* Mostrar Spinner o mensaje de Cargando */}
      {loading ? (
        <ProgressBar indeterminate />
      ) : (
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

            {/* Verificar si hay estudiantes antes de mapearlos */}
            {hasEstudiantes ? (
             estudiantes.map((estudiante, index) => (
                <DataTable.Row style={[styles.row, { width: isMediumScreen ? 1300 : 800 }]} key={estudiante.id}>
                  <DataTable.Cell style={styles.tableCell}>{estudiante.nombreCompleto}</DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>{estudiante.dni}</DataTable.Cell>
                  <DataTable.Cell style={styles.actionCell}>
                    <Button
                      mode="contained"
                      onPress={() => setModalVisible(true)}
                      style={styles.addButton}
                      compact
                    >
                      Agregar Nota
                    </Button>
                    <Button
                      mode="contained"
                      onPress={() => setModalVisible(true)}
                      style={styles.editButton}
                      compact
                    >
                      Editar Notas
                    </Button>
                </DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No hay estudiantes disponibles.</Text>
          )}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(estudiantes.length / numberOfItemsPerPage)}
            onPageChange={newPage => setPage(newPage)}
            label={`${from + 1}-${to} de ${estudiantes.length}`}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={setNumberOfItemsPerPage}
            showFastPaginationControls
            selectPageDropdownLabel={'Filas por página'}
            style={styles.pagination}
          />
        </DataTable>
      </ScrollView>
    )}

    <ModalNuevaNota
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  </View>
);
};

// Estilos
const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#4CAF50', // Puedes cambiar el color para diferenciarlo
    marginRight: 5, // Para un poco de separación entre los botones
  },
  editButton: {
    backgroundColor: '#1E88E5',
  },
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

pagination: {
  justifyContent: 'flex-start',
  marginVertical: 7,
},
});
