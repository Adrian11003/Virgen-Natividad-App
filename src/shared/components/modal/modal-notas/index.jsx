
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Modal, ScrollView, StyleSheet } from 'react-native';
import { Button, ProgressBar, DataTable } from 'react-native-paper';
import { NotasContext } from '../path/to/NotasContext';
import { useTheme } from '../../../../core/context/themeContext';

export const ModalNuevaNota = ({ modalVisible, setModalVisible, seccion }) => {
  const { notas, loadingNotas, getNotas, createNota } = useContext(NotasContext);
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  const [notasSemana, setNotasSemana] = useState([]);
  const [selectedSemana, setSelectedSemana] = useState(1);

  useEffect(() => {
   
    setDocenteId(user.perfil._id);
    
}, [user]);
  useEffect(() => {
    getNotas();
  }, []);

  useEffect(() => {
    if (notas) {
      const notasFiltradas = notas.filter(nota => nota.semana === selectedSemana);
      setNotasSemana(notasFiltradas);
    }
  }, [notas, selectedSemana]);

  const renderNotas = () => {
    if (loadingNotas) {
      return <ProgressBar indeterminate />;
    }

    if (notasSemana.length === 0) {
      return <Text style={styles.noDataText}>No hay datos de notas.</Text>;
    }

    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 2 }}>Materia</DataTable.Title>
          <DataTable.Title numeric>Nota</DataTable.Title>
        </DataTable.Header>
        {notasSemana.map((nota, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{ flex: 2 }}>{nota.materia}</DataTable.Cell>
            <DataTable.Cell numeric>{nota.puntuacion}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.modalBackground }]}>
          <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Semana: {selectedSemana}</Text>
          
          <ScrollView horizontal>
            <View style={{ minWidth: 300 }}>
              <Text style={[styles.sectionText, { color: theme.colors.text }]}>Exámenes diarios:</Text>
              {renderNotas()}
              <Text style={[styles.sectionText, { color: theme.colors.text }]}>Tarea semanal:</Text>
              {renderNotas()}
            </View>
          </ScrollView>

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
      </View>
    </Modal>
  );
};