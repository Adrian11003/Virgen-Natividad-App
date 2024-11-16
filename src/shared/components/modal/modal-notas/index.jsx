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
import {listaTiposNota} from '../../../constants/custom/item-tipo-nota';
import isMediumScreen from '../../../constants/screen-width/md';
import { CustomSnackbar } from '../../../components/custom/snackbar/index';
import { letraANumero } from '../../../constants/custom/item-tipo-letra';
import { ProgressBar } from 'react-native-paper';

export const ModalNuevaNota = ({ modalVisible, setModalVisible, seccion, curso, estudiante, onNotaGuardada }) => {

  const { bimestres, getBimestres, getSeccionesCursosByDocente, createNota } = useContext(NotasContext);
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  const [selectedBimestre, setSelectedBimestre] = useState(null);
  const [selectedTipoNota, setSelectedTipoNota ] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [nota, setNota] = useState("");
  

  const field = 'nombre';
 
  useEffect(() => {
    if(modalVisible) {
    setSelectedBimestre(null);
    setSelectedTipoNota(null)
    setNota("");
    getSeccionesCursosByDocente(user.perfil._id)
      .then(() => {
        getBimestres();
      });
    }
  }, [modalVisible]);

  const handleGuardar = () => {
    setLoading(true);
    const notaNumerica = letraANumero[nota] 
    const nuevaNota = {
      estudiante_id: estudiante._id,
      periodo_id:estudiante.periodo._id,
      docente_id: user.perfil._id,
      seccion_id: seccion, 
      grado_id: estudiante.grado._id,
      curso_id: curso, 
      bimestre_id: selectedBimestre._id,
      nota: notaNumerica,
      notaLetra: nota,
      tipoNota: selectedTipoNota.nombre
    };

    console.log(nuevaNota);

    if (!["AD", "A", "B", "C"].includes(nuevaNota.notaLetra)) {
      setSnackbarMessage("Solo se permiten notas AD, A, B o C.");
      setSnackbarVisible(true);
      setLoading(false);
      return;
    }

    createNota(nuevaNota)
      .then(() => {
        setLoading(false);
        if (onNotaGuardada) onNotaGuardada();
      })
  };


      // try {
    //   // Realizar la solicitud para guardar la nueva nota
    //   const response = createNota(nuevaNota);
    //   console.log('Nota guardada correctamente:', response);
    //   setSnackbarMessage('Nota guardada correctamente');
    //   setSnackbarVisible(true);
    //   setModalVisible(false); // Cerrar el modal
    // } catch (error) {
    //   console.error('Error al guardar la nota:', error.response?.data || error.message);
    //   setSnackbarMessage('Hubo un error al guardar la nota');
    //   setSnackbarVisible(true);
    // }

 const handleCancel = () => {
  setNota("");  // Limpiar campos
  setSelectedBimestre(null); // Limpiar selección de bimestre
  setModalVisible(false); // Cerrar el modal
};
  const handleSelect = (tipoNota) => {
    if (!selectedBimestre) {
      setSnackbarMessage('Seleccione un bimestre');
      setSnackbarVisible(true);
    } else {
      ///// AQUIII
      setSelectedTipoNota(tipoNota); // Aquí seleccionamos el objeto completo
      console.log(selectedTipoNota);  
    
    }
  };

  return (

    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={ { backgroundColor: theme.colors.modalBackground, 
        width: isMediumScreen ? 500 : '90%',
        borderRadius: 10,
        padding: 20, 
        borderColor: 'rgb(192, 192, 192)',
        borderRadius: 8,
        
        }}>

          {/* Selector de Bimestre */}
          <View style={styles.bimestreContainer}>
            <Text style={[styles.sectionTitle, { color: theme.colors.paperText }]}></Text>
            {/* <CustomSelector
              opciones={bimestres}
              selectedOption={selectedBimestre}
              onSelect={handleBimestreSelect}
              placeholder="Selecciona un bimestre"
              getDisplayValue={(item) => item.nombre}
              isOpen={openSelector === 'bimestre'}
              onOpen={() => handleSelectorOpen('bimestre')}
            /> */}
            { loading && <ProgressBar indeterminate /> }

  <View style={{ zIndex: 1000 }}>
            <View style={{ zIndex: 13,marginBottom: 20}}>
             <CustomSelector
                        opciones={bimestres}
                        selectedValue={selectedBimestre}
                        onChange={(item) => setSelectedBimestre(item)}
                        placeholder="Bimestres"
                        
                        isModal={true}
                        field={field}
                        modalwidth='100%'
              />
            </View>
            <View style={{ marginBottom: 20, zIndex: 12 }}>
              
              <CustomSelector
                     opciones={listaTiposNota}
                     selectedValue={selectedTipoNota}
                     onChange={handleSelect}
                     placeholder="Tipo de Nota"
                     isModal={true}
                     field={field}
                     modalwidth='100%'
              />  
          </View>
          </View>
          </View>

          <Text style={[styles.sectionTitle, { color: theme.colors.paperText }]}>Tipo de Notas:</Text>

          {/* Input para cada nota */}
          {/* Exposición */}
          <View style={ {
            alignItems: 'center',
            marginBottom: 8,
            width: '100%', 
            marginTop: 20
            
            }}>
              
            <TextInput
              placeholder={
                selectedTipoNota 
                  ? `Ingrese la nota `
                  : 'Seleccione un tipo de nota'
              }
              value={nota}
              onChangeText={text => setNota(text)}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon="pencil"
                  color={theme.colors.customIcon}
                  size={24}
                />
              }
              style={{ width: '100%' }}
            />
          </View>
          <View style={styles.buttonContainer}>
             {/* Botón de Enviar Solicitud */}
          <Button
            mode="contained"
            onPress={() => {
              // Función para enviar solicitud
              console.log("Solicitud enviada");
            }}
            contentStyle={styles.enviarButtonContent}
            labelStyle={styles.enviarButtonLabel}
            color={theme.colors.primary} // Color personalizado del botón de enviar solicitud
          >
            Enviar Solicitud
          </Button>
          <Button
            mode="contained"
            onPress={handleGuardar}
            contentStyle={styles.guardarButtonContent}
            labelStyle={styles.guardarButtonLabel}
            color={theme.colors.primary} // Color personalizado del botón de guardar
            style={{ marginTop: 10 }} // Margen superior para separar de Enviar Solicitud
          >
            Guardar
          </Button>

           {/* Botón de Cancelar */}
         
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
        <View style={{width:'100%',position: 'absolute', bottom: 0, padding: 16}}>
          <CustomSnackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            message={snackbarMessage}
          />
          </View>
       
      </View>

      
    </Modal>

  );
};

const styles = StyleSheet.create({
  bimestreContainer: {
    zIndex:10,
    width: '100%',
  },
  modalOverlay: {
    
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
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
    flexDirection: 'row', // Asegura que los botones estén en la misma fila
    gap: 10, // Espacio entre los botones
  },
  cancelButtonContent: {
    height: 48, // Altura del botón
    justifyContent: 'center',
  },
  cancelButtonLabel: {
    fontSize: 16,
    color: 'white', // Color del texto del botón
  },
  cancelButtonContent: {
    height: 48, // Altura del botón
    justifyContent: 'center',
  },
  cancelButtonLabel: {
    fontSize: 16,
    color: 'white', // Color del texto del botón
  },
  enviarButtonContent: {
    height: 48,
    justifyContent: 'center',
  },
  enviarButtonLabel: {
    fontSize: 16,
    color: 'white', // Ajusta el color del texto del botón
  },
  guardarButtonContent: {
    height: 48,
    justifyContent: 'center',
  },
  guardarButtonLabel: {
    fontSize: 16,
    color: 'white',
  },
});