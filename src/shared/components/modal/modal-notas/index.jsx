import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton,Button } from 'react-native-paper';
import { NotasContext } from '../../../../core/context/notasContext';
import { useTheme } from '../../../../core/context/themeContext';
import { CustomSelector } from '../../../../shared/components/custom/selector/index';
import { TextInput } from 'react-native-paper';
import { EstudiantesContext } from '../../../../core/context/estudiantesContext';
import { AuthContext } from '../../../../core/context/authContext';
import { useRoute } from '@react-navigation/native';

export const ModalNuevaNota = ({ modalVisible, setModalVisible }) => {
 // Call useRoute here to get the route object
 const route = useRoute();  // <-- Ensure this is at the top of your component

 // Destructure the params from route
 const { seccion, curso } = route.params; // <-- Now it will work

 // Your context and other state hooks
 const { bimestres, getBimestres, getSeccionesCursosByDocente, secciones, cursos, loadingSeccionesCursos } = useContext(NotasContext);
 const { theme } = useTheme();
 const [selectedBimestre, setSelectedBimestre] = useState(null);
 const [bimestresCargados, setBimestresCargados] = useState(false);
 const [openSelector, setOpenSelector] = useState(null);
 const [docenteId, setDocenteId] = useState(null);
 const { estudiantes, getEstudiantesBySeccion, loading } = useContext(EstudiantesContext);
 const { user } = useContext(AuthContext);

 // Other state hooks
 const [exposicion, setExposicion] = useState("");
 const [participacion, setParticipacion] = useState("");
 const [bimestral, setBimestral] = useState("");
 const [desempenoClase, setDesempenoClase] = useState("");

 // Your useEffects, event handlers, and return JSX here...
useEffect(() => {
  setDocenteId(user.perfil._id);
}, [user]);

useEffect(() => {
  if (docenteId) {
    getSeccionesCursosByDocente(docenteId);
  }
}, [docenteId]);

useEffect(() => {
  getEstudiantesBySeccion(seccion._id);
}, [secciones]);

useEffect(() => {
  if (modalVisible && !bimestresCargados) {
    getBimestres();
    setBimestresCargados(true);
  }
}, [modalVisible, bimestresCargados, getBimestres]);

const handleBimestreSelect = (bimestre) => {
  setSelectedBimestre(bimestre);
};

const handleSelectorOpen = (selectorName) => {
  setOpenSelector(openSelector === selectorName ? null : selectorName);
};

const handleNotaChange = (text, setter) => {
  // Permite el valor vacío (""), o valida si es un valor permitido
  if (text === "" || notaOptions.includes(text)) {
    setter(text);
  }
};

const handleGuardar = () => {
  // Aquí podrías realizar la acción de guardar, como llamar a una API o actualizar el estado de la aplicación
  console.log("Datos guardados:", { exposicion, participacion, bimestral, desempenoClase, selectedBimestre });
  setModalVisible(false); // Cerrar el modal después de guardar
};

// Función para manejar el cancelamiento
const handleCancel = () => {
  // Opcional: Restablece los campos de entrada
  setExposicion("");
  setParticipacion("");
  setBimestral("");
  setDesempenoClase("");
  setSelectedBimestre(null);
  setModalVisible(false);
};


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.modalBackground }]}>

          {/* Selector de Bimestre */}
          <View style={styles.bimestreContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.paperText }]}></Text>
            <CustomSelector
              opciones={bimestres}
              selectedOption={selectedBimestre}
              onSelect={handleBimestreSelect}
              placeholder="Selecciona un bimestre"
              getDisplayValue={(item) => item.nombre}
              isOpen={openSelector === 'bimestre'}
              onOpen={() => handleSelectorOpen('bimestre')}
            />
          </View>

          <Text style={[styles.sectionTitle, { color: theme.colors.paperText }]}>Notas:</Text>

          {/* Input para cada nota */}
          {/* Exposición */}
          <View style={[styles.notasContainer, { position: 'relative', zIndex: openSelector === 'exposicion' ? 100 : 1 }]}>
            <Text style={[styles.notaLabel, { color: theme.colors.paperText }]}>• Exposición :</Text>
            <TextInput
              label="Nota de Exposición" // Usa label en lugar de placeholder
              value={exposicion}
              onChangeText={text => handleNotaChange(text, setExposicion)}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon="pencil"
                  color={theme.colors.customIcon}
                  size={24}
                />
              }
            />
          </View>

          {/* Participación */}
          <View style={[styles.notasContainer, { position: 'relative', zIndex: openSelector === 'participacion' ? 99 : 1 }]}>
            <Text style={[styles.notaLabel, { color: theme.colors.paperText }]}>• Participación :</Text>
            <TextInput
              label="Nota de Participación"
              value={participacion}
              onChangeText={text => handleNotaChange(text, setParticipacion)}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon="pencil"
                  color={theme.colors.customIcon}
                  size={24}
                />
              }
            />
          </View>

          {/* Bimestral */}
          <View style={[styles.notasContainer, { position: 'relative', zIndex: openSelector === 'bimestral' ? 98 : 1 }]}>
            <Text style={[styles.notaLabel, { color: theme.colors.paperText }]}>• Bimestral :</Text>
            <TextInput
              label="Nota Bimestral"
              value={bimestral}
              onChangeText={text =>handleNotaChange(text, setBimestral)}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon="pencil"
                  color={theme.colors.customIcon}
                  size={24}
                />
              }
            />
          </View>

          {/* Desempeño en Clase */}
          <View style={[styles.notasContainer, { position: 'relative', zIndex: openSelector === 'desempenoClase' ? 97 : 1 }]}>
            <Text style={[styles.notaLabel, { color: theme.colors.paperText }]}>• Desempeño en clase :</Text>
            <TextInput
              label="Nota de Desempeño en Clase"
              value={desempenoClase}
              onChangeText={text => handleNotaChange(text, setDesempenoClase)}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon="pencil"
                  color={theme.colors.customIcon}
                  size={24}
                />
              }
            />
          </View>
           {/* Botón de Cancelar */}
           <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleCancel}
              contentStyle={styles.cancelButtonContent}
              labelStyle={styles.cancelButtonLabel}
              color={theme.colors.accent} // Puedes ajustar el color según tu tema
            >
              Cancelar
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bimestreContainer: {
    zIndex:10,
    width: '50%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    borderRadius: 15,
    padding: 5,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '50%',
    zIndex:9,
  },
  notaLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  bimestreDropdown: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    maxHeight: 100,
  },
  bimestreItem: {
    padding: 8,
    fontSize: 14,
    color: 'black',
  },
  buttonContainer: {
    marginTop: 20, // Espacio superior para separar del último input
    alignItems: 'flex-end', // Alinea el botón a la derecha; puedes cambiar a 'center' si prefieres
  },
  cancelButtonContent: {
    height: 48, // Altura del botón
    justifyContent: 'center',
  },
  cancelButtonLabel: {
    fontSize: 16,
    color: 'white', // Color del texto del botón
  },
});