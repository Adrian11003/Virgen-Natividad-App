import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Modal, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, ProgressBar, DataTable } from 'react-native-paper';
import { NotasContext } from '../../../../core/context/notasContext';
import { useTheme } from '../../../../core/context/themeContext';
import { AuthContext } from '../../../../core/context/authContext';
import isMediumScreen from '../../../constants/screen-width/md';
import { CustomSnackbar } from '../../custom/snackbar/index'; 

const MAX_WEEKS = 40;
const WEEKS_PER_PAGE = 8;

export const ModalNuevaNota = ({ modalVisible, setModalVisible, selectedSemana, renderNotasProp, snackbarVisible, snackbarMessage }) => {
  const { notas, loadingNotas, getNotas } = useContext(NotasContext);
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  const [notasSemana, setNotasSemana] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  

  useEffect(() => {
    console.log("Notas recibidas del contexto:", notas);
    getNotas();
  }, []);

  useEffect(() => {
    console.log("Semana seleccionada:", selectedSemana);
    if (notas) {
      const notasFiltradas = notas.filter(nota => nota.semana === selectedSemana);
      console.log("Notas para la semana seleccionada:", notasFiltradas);
      setNotasSemana(notasFiltradas);
    }
  }, [notas, selectedSemana]);
  const renderNotas = () => { 
    if (loadingNotas) {
      return <ProgressBar indeterminate />;
    }
  
    if (notasSemana.length === 0) {
      return <Text style={[styles.noDataText, { color: theme.colors.textSecondary }]}>No hay datos de notas.</Text>;
    }
    
    console.log("Notas que se van a renderizar:", notasSemana); // <-- Agrega esto
  
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 1 }}>Materia</DataTable.Title>
          <DataTable.Title numeric style={{ flex: 0.5 }}>Nota</DataTable.Title>
        </DataTable.Header>
        {notasSemana.map((nota, index) => (
          <DataTable.Row key={index}>
            {/* Accedemos al nombre de la materia desde curso.nombre */}
            <DataTable.Cell style={{ flex: 1 }}>{nota.curso.nombre}</DataTable.Cell> 
            {/* La nota se accede directamente */}
            <DataTable.Cell numeric style={{ flex: 0.5 }}>{nota.nota}</DataTable.Cell> 
          </DataTable.Row>
        ))}
      </DataTable>
    );
  };
  const renderWeeks = () => {
    const startWeek = currentPage * WEEKS_PER_PAGE + 1;
    const endWeek = Math.min(startWeek + WEEKS_PER_PAGE - 1, MAX_WEEKS);
  
    return Array.from({ length: endWeek - startWeek + 1 }, (_, i) => startWeek + i).map(week => (
      <TouchableOpacity
        key={week}
        onPress={() => {
          setSelectedSemana(week); // Actualiza el estado para mostrar la semana seleccionada
          console.log(`Semana ${week} seleccionada`);
        }}
        style={[
          styles.weekButton,
          selectedSemana === week && { backgroundColor: theme.colors.primary },
        ]}
      >
        <Text style={{padding: 8,
          marginVertical: 5,
          alignItems: 'center',
          alignItems: 'center',
          backgroundColor:theme.colors.backgroundnota,
    }}>{`Semana ${week}`}</Text>
      </TouchableOpacity>
    ));
  };
  const handlePrevPage = () => {
    setCurrentPage(Math.max(0, currentPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(Math.ceil(MAX_WEEKS / WEEKS_PER_PAGE) - 1, currentPage + 1));
  };
  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
      <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              width: isMediumScreen ? '60%' : '90%',
              height: '82%',
              padding: 20,
              backgroundColor: theme.colors.modalBackground,
              borderRadius: 10,
              flexDirection: 'row',
            }}
          >
            <View style={{width: '20%',
              backgroundColor: theme.colors.backgroundnota, // Fondo azul
              padding: 15,
              borderRadius: 8,
              marginRight: 10,}}>
              {renderWeeks()}
              <View style={styles.paginationContainer}>
                <TouchableOpacity
                  onPress={handlePrevPage}
                  disabled={currentPage === 0}
                  style={[
                    styles.paginationButton,
                    currentPage === 0 && { backgroundColor: '#D3D3D3' }
                  ]}
                >
                  <Text style={styles.paginationButtonText}>{"<"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextPage}
                  disabled={currentPage >= Math.ceil(MAX_WEEKS / WEEKS_PER_PAGE) - 1}
                  style={[
                    styles.paginationButton,
                    currentPage >= Math.ceil(MAX_WEEKS / WEEKS_PER_PAGE) - 1 && { backgroundColor: '#D3D3D3' }
                  ]}
                >
                  <Text style={styles.paginationButtonText}>{">"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView style={{ flex: 1 }} vertical>
              <ScrollView horizontal>
                <View style={{ width: 690 }}>
                <Text
                    style={{
                      fontSize: 16,
                      marginBottom: 15,
                      fontWeight: '700',
                      color: theme.colors.paperText,
                    }}
                  >
                    Semana: {selectedSemana}
                  </Text>

                  <View style={{ zIndex: 2 }}>
                    <Text style={[styles.sectionText, { color: theme.colors.paperText }]}>Exámenes diarios:</Text>
                    <View>{renderNotas()}</View>

                    <Text style={[styles.sectionText, { color: theme.colors.paperText }]}>Tarea semanal:</Text>
                    <View>{renderNotas()}</View>
                  </View>

                  <View style={styles.buttonContainer}>
                    <Button mode="contained" onPress={() => setModalVisible(false)} style={styles.button}>
                      Cerrar
                    </Button>
                    <Button
                      mode="contained"
                      onPress={() => console.log('Registrar Nota')}
                      style={styles.button}
                    >
                      Guardar Nota
                    </Button>
                  </View>
                </View>
              </ScrollView>
            </ScrollView>
            {snackbarVisible && (
              <View style={{ marginBottom: -20 }}>
                <CustomSnackbar
                  visible={snackbarVisible}
                  onDismiss={() => setSnackbarVisible(false)}
                  message={snackbarMessage}
                />
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  button: {
    flex: 0.4,
    paddingVertical: 5, 
  },
  noDataText: {
    textAlign: 'center',
  },

  weekButtonText: {
    color: '#FFFFFF', // Texto blanco
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  paginationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A73E8', // Color azul de los botones
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationButtonText: {
    color: '#FFFFFF', // Texto blanco en los botones de paginación
    fontSize: 18,
    fontWeight: 'bold',
  },
});