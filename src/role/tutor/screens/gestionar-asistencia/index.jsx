import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { AsistenciaContext } from '../../../../core/context/asistenciaContext';
import { Button, DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { CustomSelector } from '../../../../shared/components/custom/selector/index';
import { useTheme } from '../../../../core/context/themeContext';
import { ModalNuevaAsistencia } from '../../../../shared/components/modal/modal-asistencia/index';
import { IconButton } from '../../../../shared/components/custom/iconns/index'; 

const isMediumScreen = Dimensions.get('window').width >= 768;

export const GestionarAsistencia = () => {
  const [selectedSemana, setSelectedSemana] = useState();
  const { user } = useContext(AuthContext);
  const { semanas, fetchSemanas } = useContext(AsistenciaContext);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(5);
  const items = [1,2,3,4,5,6]; // Ejemplo de datos

  useEffect(() => {
    fetchSemanas();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.colors.paperText }}>
            Sección: {user.perfil.seccion.nombre}
          </Text>
      <View style={styles.headerContainer}>
        <CustomSelector
          opciones={semanas}
          selectedOption={selectedSemana}
          onSelect={(item) => setSelectedSemana(item)}
          placeholder="Semana"
          mobileWidth="20%"
          isModal={false}
        />
        <Button 
          icon="plus" 
          mode="contained" 
          style={{ width: isMediumScreen ? '25%' : '100%' }}
          buttonColor={theme.colors.primary}
          onPress={() => setModalVisible(true)}
        >
          Nueva Asistencia
        </Button>
      </View>

      <ModalNuevaAsistencia
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        seccion={user.perfil.seccion.nombre}
      />

      <ScrollView 
        horizontal={!isMediumScreen}
        contentContainerStyle={{
          height: '80%',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <View style={{
          backgroundColor: theme.colors.tableBackgroundColor,  // Color de fondo para toda la tabla
          borderWidth: 1,
          borderColor: '#D7D6DA',
          borderRadius: 8,
          width: '100%',
          marginBottom: 40,
         
        }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.header}>Semana</DataTable.Title>
            <DataTable.Title style={styles.header} numeric> Dia </DataTable.Title>
            <DataTable.Title style={styles.header} numeric> Fecha </DataTable.Title>
            <DataTable.Title style={styles.header} numeric> Presentes </DataTable.Title>
            <DataTable.Title style={styles.header} numeric> Faltas </DataTable.Title>
            <DataTable.Title style={styles.header} numeric> Justificados </DataTable.Title>
            <DataTable.Title style={styles.header} numeric> Acciones </DataTable.Title>
          </DataTable.Header>

          {items.slice(from, to).map((item, index) => (
            <DataTable.Row key={index} style={styles.row}>
              <DataTable.Cell style={styles.cell}>Semana {item}</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>Lun.</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>30/09/2024</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>25</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>12</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>0</DataTable.Cell>
              <DataTable.Cell style={styles.actionsCell} numeric>
                <IconButton
                  iconName="pencil-outline"
                  color="#007bff"
                  onPress={() => console.log("Editar")}
                />
                <IconButton
                  iconName="trash-outline"
                  color="#ff0000"
                  onPress={() => console.log("Eliminar")}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
          
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} de ${items.length}`}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            numberOfItemsPerPageList={[5, 10, 15]}
            selectPageDropdownLabel={'Filas por página'}
          />
         </DataTable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    maxWidth: 1300, 
    marginVertical: 15, 
    marginHorizontal: 'auto', 
  },
  headerContainer: {
    zIndex: 2,    
    flexDirection: isMediumScreen ? 'row' : 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    zIndex: 2,
    paddingVertical: 12,
    justifyContent: 'flex-start',
    width: '100%', // Ocupa todo el ancho
  },
  actionsCell: {
    zIndex: 2,
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'flex-start',
  },
  header: {
    zIndex: 2,
    fontWeight: 'bold',
    fontSize: 14,
    width: '100%',            // Asegura que el título ocupe todo el ancho
    borderBottomWidth: 1,     // Borde inferior para el encabezado
    borderBottomColor: '#D7D6DA',
    justifyContent: 'center', 
  },
});
