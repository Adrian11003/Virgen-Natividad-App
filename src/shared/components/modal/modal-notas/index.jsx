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
  const { 
    createNota, updateNota, getBimestres, changeNotaStateProcessed,
    createSolicitudNota, deleteSolicitudNota, getSolicitudNota,
    getSeccionesCursosByDocente, getNotasByEstudianteCursoBimestreSeccionTipoNota
  } = useContext(NotasContext);
  const { user } = useContext(AuthContext);
  const { theme, isDarkTheme } = useTheme();

  const [selectedBimestre, setSelectedBimestre] = useState(null);
  const [selectedTipoNota, setSelectedTipoNota ] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [bimestres, setBimestres] = useState([]);
  const [foundData, setFoundData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [textAreaVisible, setTextAreaVisible] = useState(false);
  const [nota, setNota] = useState("");
  const [notaIsProcessed, setNotaIsProcessed] = useState(false);
  const [notaIsApproved, setNotaIsApproved] = useState(false);
  const [notaCanRequest, setNotaCanRequest] = useState(false);
  const [motivo, setMotivo] = useState("");
  
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

  const guardarInformacion = () => {
    setLoading(true);

    if (!selectedBimestre || !selectedBimestre._id) {
      setSnackbarMessage('Debe seleccionar el bimestre.');
      setSnackbarVisible(true);
      setLoading(false);
      return;
    }
  
    if (!selectedTipoNota || !selectedTipoNota.nombre) {
      setSnackbarMessage('Debe seleccionar el tipo de nota.');
      setSnackbarVisible(true);
      setLoading(false);
      return;
    }
  
    if (!nota || nota.trim() === "") {
      setSnackbarMessage('Debe ingresar la nota.');
      setSnackbarVisible(true);
      setLoading(false);
      return;
    }  

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

    if (!["AD", "A", "B", "C"].includes(nuevaNota.notaLetra)) {
      setSnackbarMessage("Solo se permiten notas AD, A, B o C.");
      setSnackbarVisible(true);
      setLoading(false);
      return;
    }

    if(foundData) {
      data = {
        nota: notaNumerica,
        notaLetra: nota,
      }
      updateNota(foundData._id, data)
        .then((data) => {
          setSnackbarMessage('Nota actualizada con éxito.');
          setSnackbarVisible(true);
          setTextAreaVisible(false);
          setLoading(false);
          setFoundData(data);
          setIsEditable(false);
          setNotaCanRequest(true);
          setNotaIsProcessed(false);
          setNotaIsApproved(false);
          getSolicitudNota(user.perfil._id, estudiante._id, curso, seccion, selectedBimestre._id, selectedTipoNota.nombre)
            .then((data) => {
              deleteSolicitudNota(data._id);
            })
        })
    } else {
      createNota(nuevaNota)
        .then((data) => {
          setSnackbarMessage('Nota guardada con éxito.');
          setSnackbarVisible(true);
          setTextAreaVisible(false);
          setLoading(false)
          setFoundData(data)
          setIsEditable(false);
          setNotaCanRequest(true)
        }) 
    }
  };

  const handleCancel = () => {
    setNota("");
    setSelectedBimestre(null);
    setTextAreaVisible(false);
    setModalVisible(false);
    setIsEditable(false);
    setFoundData(null);
    setNotaCanRequest(false);
    setNotaIsProcessed(false);
    setNotaIsApproved(false);
  };

  const handleSelect = (tipoNota) => {
    if (!selectedBimestre) {
      setSnackbarMessage('Seleccione un bimestre');
      setSnackbarVisible(true);
    } else {
      setLoading(true)
      getNotasByEstudianteCursoBimestreSeccionTipoNota(
        estudiante._id, curso, selectedBimestre._id, seccion, tipoNota.nombre
      )
        .then((data) => {
          setSelectedTipoNota(tipoNota);
          const estado = data[0].estado
          const foundData = data.length > 0 ? data[0] : null;
          setFoundData(foundData);
          setNota(foundData.notaLetra);
          console.log(foundData);
          if(estado === null || estado === 'Rechazado') {
            if (estado === 'Rechazado') {
              setSnackbarMessage('La solicitud de cambio ha sido rechazada, puede solicitar otro cambio.');
            } else {
              setSnackbarMessage('Si ha tenido alguna confusión en la nota, puede solicitar un cambio.');
            }
            console.log(foundData)
            setSnackbarVisible(true);
            setTextAreaVisible(false);
            setIsEditable(false);
            setLoading(false);
            setNotaIsProcessed(false);
            setNotaIsApproved(false);
            setNotaCanRequest(true);
          }
          if(estado === 'En Proceso') {
            setSnackbarMessage('La solicitud de cambio sigue en proceso.');
            setSnackbarVisible(true);
            setTextAreaVisible(false);
            setIsEditable(false);
            setLoading(false);
            setNotaCanRequest(false); 
            setNotaIsApproved(false);
            setNotaIsProcessed(true);
          }
          if(estado === 'Aprobado') {
            setSnackbarMessage('La solicitud de cambio ha sido aprobada, puede editar la nota.');
            setSnackbarVisible(true);
            setTextAreaVisible(false);
            setIsEditable(true);
            setLoading(false);
            setNotaCanRequest(false);
            setNotaIsProcessed(false);
            setNotaIsApproved(true);
          }

        })
        .catch(() => {
          setSnackbarMessage('Debe asignar la nota.');
          setTextAreaVisible(false);
          setSnackbarVisible(true);
          setIsEditable(true);
          setFoundData(null);
          setLoading(false);
          setNota("");
        });
    }
  };

  const solicitarCambio = () => {
    setTextAreaVisible(true)
  };

  const enviarSolicitud = () => {
    setLoading(true)

    if(motivo === "") {
      setSnackbarMessage('Debe ingresar un motivo para la solicitud');
      setSnackbarVisible(true);
      setLoading(false)
      return
    }

    const data = {
      docente_id: user.perfil._id,
      descripcion: motivo,
      estudiante_id: estudiante._id,
      curso_id: curso,
      seccion_id: seccion,
      bimestre_id: selectedBimestre._id,
      tipoNota: selectedTipoNota.nombre,
    }

    createSolicitudNota(data)
      .then(() => {
        changeNotaStateProcessed(foundData._id);
        setTextAreaVisible(false);
        setLoading(false);
        if (onNotaGuardada) onNotaGuardada();
      })
      .catch((error) => {
        setLoading(false);
        setTextAreaVisible(false);
        setSnackbarMessage(error.response.data.message);
        setSnackbarVisible(true);
      });
  }

  const BotonSolicitarCambio = (
    <Button
      mode="contained"
      onPress={solicitarCambio}
    >
      Solicitar Cambio
    </Button>
  )

  const BotonEnviarSolicitud = (
    <Button
      mode="contained"
      onPress={enviarSolicitud}
    >
      Enviar Solicitud Cambio
    </Button>
  );

  const BotonCancelar = (
    <Button
      mode="contained"
      onPress={handleCancel}
    >
      Cancelar
    </Button>
  )

  const BotonGuardarInformacion = (
    <Button
      mode="contained"
      onPress={guardarInformacion}
    >
      Guardar
    </Button>
  )

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
        <View 
          style={{ 
            backgroundColor: theme.colors.modalBackground, 
            width: isMediumScreen ? 500 : '90%',
            borderRadius: 10,
            padding: 20, 
            borderColor: 'rgb(192, 192, 192)',
            borderRadius: 8,
          }}
        >
          {/* Selector de Bimestre */}
          <View 
            style={{
              zIndex: 10,
              width: '100%'
            }}
          >
            { loading && (
              <View style={{ position: 'absolute', top: -20, left: 0, right: 0, zIndex: 20 }}>
                <ProgressBar indeterminate />
              </View>
            )}
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

          {/* Tipo de Nota */}
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
              style={{
                width: '100%',
                backgroundColor: isDarkTheme ? (isEditable ? theme.colors.tableBackgroundColor : '#878787') : (isEditable ? 'white' : '#e0e0e0'), 
                opacity: isEditable ? 1 : 0.6, 
              }}
              editable={isEditable}
            />
          </View>

          { textAreaVisible && (
            <View style={{ marginTop: 20 }}>
              <TextInput
                label="Motivo de la solicitud"
                mode="outlined"
                multiline
                onChangeText={text => setMotivo(text)}
                numberOfLines={4}
                style={{ width: '100%' }}
              />
            </View>
          )}

          <View 
            style={{
              marginTop: 25, 
              alignItems: 'flex-end', 
              flexDirection: 'row', 
              gap: 10,
            }}
          >
            { foundData ? (
              textAreaVisible ? (
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', gap: 5 }}>
                  {BotonEnviarSolicitud}
                  {BotonCancelar}
                </View>
              ) : (
                <>
                  { notaCanRequest && (
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', gap: 5 }}>
                      {BotonSolicitarCambio}
                      {BotonCancelar}
                    </View>
                  )}

                  { notaIsProcessed && (
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', gap: 5 }}>
                      {BotonCancelar}
                    </View>
                  )}

                  { notaIsApproved && (
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', gap: 5 }}>
                      {BotonGuardarInformacion}
                      {BotonCancelar}
                    </View>
                  )}
                </>
              )
            ) : (
              <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', gap: 5 }}>
                {BotonGuardarInformacion}
                {BotonCancelar}
              </View>
            )}
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