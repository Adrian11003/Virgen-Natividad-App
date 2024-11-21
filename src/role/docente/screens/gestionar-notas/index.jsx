import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet ,ScrollView} from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
import { useTheme } from '../../../../core/context/themeContext';
import isMediumScreen from '../../../../shared/constants/screen-width/md';
import { EstudiantesContext } from '../../../../core/context/estudiantesContext';
import { DataTable } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { ModalNuevaNota } from '../../../../shared/components/modal/modal-notas/index';
import { showSweetAlert } from '../../../../shared/components/custom/swal/index';	
import { ButtonIcon } from '../../../../shared/components/custom/button-icon/index';

export const GestionarNotas = () => {
  const { getEstudiantesBySeccion, getEstudianteById } = useContext(EstudiantesContext);
  const { theme } = useTheme();
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(8);
  const route = useRoute();
  const { seccion, curso } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [estudiantes, setEstudiantes] = useState([]);
  const [dataEstudiante, setDataEstudiante] = useState({});

  const styles = useStyles(theme);
  
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

  const asignarNota = (id) => {
    getEstudianteById(id)
      .then((data) => {
        // console.log(data)
        setDataEstudiante(data);
        setModalVisible(true);
      })
  }

  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, estudiantes.length);
  const paginatedData = estudiantes.slice(from, to);

  const handleNotaGuardada = () => {
    setModalVisible(false); 

    showSweetAlert({
      title: 'Solicitud Enviada',
      text: 'La solicitud de cambio de nota ha sido enviada con éxito',
      showCancelButton: false,
      confirmButtonText: 'Ok',
      type: 'success',
      onConfirm: () => {}
    });
  };

  if (loading) {
    return <ProgressBar indeterminate />;
  }

  const hasEstudiantes = estudiantes && estudiantes.length > 0;
  
  return (
    <View style={{ width: '100%', maxWidth: 1300, marginTop: isMediumScreen ? 30 : 15, marginHorizontal: 'auto' }}>
      <View
        style={{
          flexDirection: isMediumScreen ? 'row' : 'column',  
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 20,
          marginHorizontal: 20,
          zIndex: 2
        }}
      >
        
        <Text style={[styles.sectionText, { color: theme.colors.paperText }]}>
          Sección: {seccion.nombre} | Curso: {curso.nombre}
        </Text>
      </View>

      
      {/* Mostrar Spinner o mensaje de Cargando */}
      {loading ? (
        <ProgressBar indeterminate />
      ) : (
        <View style={{marginHorizontal:20}}> 
        <View style={{  
          width: '100%', 
          borderWidth: 1,
          borderColor: 'rgb(192, 192, 192)',
          borderRadius: 8,
          justifyContent: 'center',
          marginBottom: 40,
          backgroundColor: theme.colors.tableBackgroundColor,
        
          
         }}>
        <ScrollView horizontal>
          <DataTable style={{ 
            
            }}>
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
              paginatedData.map((estudiante, index) => (
                <DataTable.Row style={[styles.row, { width: isMediumScreen ? 1300 : 800 }]} key={estudiante.id}>
                  <DataTable.Cell style={styles.tableCell}>{estudiante.nombreCompleto}</DataTable.Cell>
                  <DataTable.Cell style={styles.tableCell}>{estudiante.dni}</DataTable.Cell>
                  <DataTable.Cell style={styles.actionCell}>
                    <ButtonIcon 
                      iconName="add-circle" 
                      mode="contained"
                      color="#007bff" 
                      size={20}
                      onPress={() => asignarNota(estudiante.id)}
                      style={styles.addButton}
                      compact
                    />
                    
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
    </View>
    </View>)}
    
  
    <ModalNuevaNota
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      estudiante={dataEstudiante}
      seccion={seccion._id}
      curso={curso._id}
      onNotaGuardada={handleNotaGuardada}
    />
    
  </View>
);
};

// Estilos
const useStyles = (theme)=> StyleSheet.create({
  addButton: {
    backgroundColor: '#4CAF50', // Puedes cambiar el color para diferenciarlo
    marginRight: 5, // Para un poco de separación entre los botones
  },
  editButton: {
    backgroundColor: '#1E88E5',
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
