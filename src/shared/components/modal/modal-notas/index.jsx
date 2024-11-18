import { useState, useEffect, useContext } from 'react';
import { View, Text, Modal } from 'react-native';
import { Button, ProgressBar, TextInput } from 'react-native-paper';
import { NotasContext } from '../../../../core/context/notasContext';
import { useTheme } from '../../../../core/context/themeContext';
import { CustomSelector } from '../../../../shared/components/custom/selector/index';
import { AuthContext } from '../../../../core/context/authContext';
import { listaTiposNota } from '../../../constants/custom/item-tipo-nota';
import { CustomSnackbar } from '../../../components/custom/snackbar/index';
import { letraANumero } from '../../../constants/custom/item-tipo-letra';
import isMediumScreen from '../../../constants/screen-width/md';

export const ModalNuevaNota = ({ modalVisible, setModalVisible, seccion, curso, estudiante, onNotaGuardada }) => {
  const { getBimestres, getSeccionesCursosByDocente, createNota } = useContext(NotasContext);
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  const [selectedBimestre, setSelectedBimestre] = useState(null);
  const [selectedTipoNota, setSelectedTipoNota ] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [bimestres, setBimestres] = useState([]);
  const [nota, setNota] = useState("");
  
  const field = 'nombre';
 
  useEffect(() => {
    if(modalVisible) {
      setSelectedBimestre(null);
      setSelectedTipoNota(null);
      setNota("");
      getSeccionesCursosByDocente(user.perfil._id)
        .then(() => {
          getBimestres()
            .then((data) => {
              setBimestres(data)
            })
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

  const handleCancel = () => {
    setNota("");
    setSelectedBimestre(null);
    setModalVisible(false)
  };

  const handleSelect = (tipoNota) => {
    if (!selectedBimestre) {
      setSnackbarMessage('Seleccione un bimestre');
      setSnackbarVisible(true);
    } else {
      ///// AQUIII
      setSelectedTipoNota(tipoNota);
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
      <View 
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <View style={ { backgroundColor: theme.colors.modalBackground, 
          width: isMediumScreen ? 500 : '90%',
          borderRadius: 10,
          padding: 20, 
          borderColor: 'rgb(192, 192, 192)',
          borderRadius: 8,
        }}>

          {/* Selector de Bimestre */}
          <View 
            style={{
              zIndex:10,
              width: '100%'
            }}
          >
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

          <Text 
            style={{ 
              color: theme.colors.paperText,
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
            }}
          >
            Tipo de Notas:
          </Text>

          {/* Exposición */}
          <View style={ {
            alignItems: 'center',
            marginBottom: 8,
            width: '100%', 
            marginTop: 20
          }}>
            <TextInput
              placeholder={ selectedTipoNota ? 'Ingrese la nota' : 'Seleccione un tipo de nota' }
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

          <View 
            style={{
              marginTop: 20, 
              alignItems: 'flex-end', 
              flexDirection: 'row', 
              gap: 10,
            }}
          >
            <Button
              mode="contained"
              onPress={() => { console.log("Solicitud enviada") }}
            >
              Enviar Solicitud
            </Button>

            <Button
              mode="contained"
              onPress={handleGuardar}
            >
              Guardar
            </Button>

            <Button
              mode="contained"
              onPress={handleCancel}
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