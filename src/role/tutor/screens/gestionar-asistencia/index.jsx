import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { AsistenciaContext } from '../../../../core/context/asistenciaContext';
import { Button, DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { CustomSelector } from '../../../../shared/components/custom/selector/index';
import { useTheme } from '../../../../core/context/themeContext';
import { ModalNuevaAsistencia } from '../../../../shared/components/modal/modal-asistencia/index';
import IconButton from '../../../../shared/components/custom/iconns/index'; 

// Definición de isMediumScreen utilizando Dimensions
const isMediumScreen = Dimensions.get('window').width >= 768;

export const GestionarAsistencia = () => {
  const [selectedSemana, setSelectedSemana] = useState();
  const { user } = useContext(AuthContext);
  const { semanas, fetchSemanas } = useContext(AsistenciaContext);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchSemanas();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.sectionInfo}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.colors.paperText }}>
            Sección: {user.perfil.seccion.nombre}
          </Text>
        </View>

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
        style={styles.scrollView} 
        horizontal={!isMediumScreen}
      >
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

          {[1, 2, 3, 4, 5].map((item, index) => (
            <DataTable.Row key={index} style={styles.row}>
              <DataTable.Cell style={styles.cell}>Semana {item}</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>Lun.</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>30/09/2024</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>25</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>12</DataTable.Cell>
              <DataTable.Cell style={styles.cell} numeric>0</DataTable.Cell>
              <DataTable.Cell style={styles.actionsCell} numeric>
                <IconButton iconName="pencil-outline" color="#007bff" onPress={() => console.log("Editar")} />
                <IconButton iconName="trash-outline" color="#ff0000" onPress={() => console.log("Eliminar")} />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 40,
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
  sectionInfo: {
    zIndex: 2,
    justifyContent: 'flex-start',
    width: isMediumScreen ? '50%' : '100%',
  },
  scrollView: {
    flex: 1,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 5, // Espacio horizontal en cada celda
  },
  cell: {
    zIndex: 2,
    paddingVertical: 12,
    justifyContent: 'flex-start',
    width: 100, // Ancho específico para cada celda para evitar que se comprima
  },
  actionsCell: {
    zIndex: 2,
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'flex-start',
  },
  header: {
    zIndex: 2,
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    fontSize: 14, // Tamaño de fuente ajustado para encabezados
    width: 100, // Ancho específico en los encabezados para que coincida con las celdas
  },
});
