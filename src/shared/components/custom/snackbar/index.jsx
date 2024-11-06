import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Snackbar } from 'react-native-paper';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

let showSnackbarRef;

const CustomSnackbar = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    showSnackbarRef = showSnackbar;
  }, []);

  const showSnackbar = (msg) => {
    setMessage(msg);
    setVisible(true);
  };

  const onDismiss = () => {
    setVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ position: 'absolute', bottom: 20, width: '100%', alignItems: 'center' }}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Este es un modal centrado en la pantalla.</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text>Cerrar Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={3000}
        action={{
          label: 'Cerrar',
          onPress: onDismiss,
        }}
        style={{
          width: isMediumScreen ? '30%' : '90%',
          alignSelf: 'center',
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente para el modal
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  snackbar: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export const showSnackbar = (msg) => {
  console.log('Mostrando Snackbar:', msg);
  if (showSnackbarRef) {
    showSnackbarRef(msg);
  }
};

export default CustomSnackbar;