import React from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

export const ModalNuevaAsistencia = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Nueva Asistencia</Text>
          {/* Aquí puedes agregar los campos o contenido de tu modal */}
          <Button
            title="Cerrar"
            onPress={() => setModalVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo oscuro semitransparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
});