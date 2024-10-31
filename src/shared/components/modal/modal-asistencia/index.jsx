import { View, Text, Modal, ScrollView, SafeAreaView } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '../../../../core/context/themeContext';
import { CustomSelector } from '../../custom/selector/index';
import { AsistenciaContext } from '../../../../core/context/asistenciaContext';
import { AuthContext } from '../../../../core/context/authContext';
import { Button, ProgressBar, DataTable } from 'react-native-paper';
import { EstudiantesContext } from '../../../../core/context/estudiantesContext';
import { CustomRadio } from '../../custom/radio-button/index';
import { CustomSnackbar } from '../../custom/snackbar/index'; 
import isMediumScreen from '../../../constants/screen-width/md';
import fechaFormateada from '../../../constants/dates/today-date-time';
import obtenerFechaActual from '../../../constants/dates/today-date-dash';
import diaSemana from '../../../constants/dates/today-day-word';
import DatePicker from 'react-native-date-picker'

export const ModalNuevaAsistencia = ({ modalVisible, setModalVisible, seccion, dataType }) => {
  const [selectedSemana, setSelectedSemana] = useState();
  const [seccionId, setSeccionId] = useState(null);
  const { user } = useContext(AuthContext);
  const { semanas, fetchSemanas, loading, createAsistencia, resumenesAsistencia } = useContext(AsistenciaContext);
  const { getEstudiantesBySeccion, estudiantes } = useContext(EstudiantesContext);
  const { theme } = useTheme();
  const [asistencia, setAsistencia] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchSemanas();
    setSeccionId(user.perfil.seccion._id);
  }, [user]);

  useEffect(() => {
    if (seccionId) {
      getEstudiantesBySeccion(seccionId);
    }
  }, [seccionId]);

  useEffect(() => {
    if (estudiantes && estudiantes.length > 0) {
      setAsistencia(estudiantes.map(() => ""));
    }
  }, [estudiantes]);

  const handleRadioChange = (index, tipo) => {
    const newAsistencia = [...asistencia];
    newAsistencia[index] = tipo;
    setAsistencia(newAsistencia);
  };

  const guardarInformacion = async () => {
    if (dataType === 'create') {
      if (!selectedSemana) {
        setSnackbarMessage('Por favor, selecciona una semana.');
        setSnackbarVisible(true);
        return;
      }

      const todosSeleccionados = asistencia.every(estado => estado !== "");
      if (!todosSeleccionados) {
        setSnackbarMessage('Debe seleccionar la asistencia de todos los estudiantes');
        setSnackbarVisible(true);
        return;
      }

      const promises = estudiantes.map((estudiante, index) => {
        const registro = {
          estudiante_id: estudiante._id,
          seccion_id: estudiante.seccion._id,
          grado_id: estudiante.grado._id,
          periodo_id: estudiante.periodo._id,
          semana_id: selectedSemana._id,
          fecha: obtenerFechaActual(),
          mes: new Date().toLocaleString('default', { month: 'long' }),
          dia: diaSemana,
          estado: asistencia[index]
        };
        return createAsistencia(registro);
      });

      try {
        await Promise.all(promises);
        console.log("Asistencia registrada exitosamente para todos los estudiantes.");
      } catch (error) {
        console.error("Hubo un error al registrar la asistencia:", error);
      }
    }
    if (dataType === 'edit') {
      console.log('Editar asistencia');
    }
  };

  if (loading) {
    return <ProgressBar indeterminate />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
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
            }}
          >
            <ScrollView style={{ flex: 1 }} vertical>
              <ScrollView horizontal>
                <View style={{ width: 940 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginBottom: 15,
                      fontWeight: '700',
                      color: theme.colors.paperText,
                    }}
                  >
                    Sección: {seccion}
                  </Text>

                  <View style={{  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Text style={{ color: theme.colors.paperText }}>Semana: </Text>

                      <CustomSelector
                        opciones={semanas}
                        selectedOption={selectedSemana}
                        onSelect={(item) => setSelectedSemana(item)}
                        placeholder="Semana"
                        mobileWidth="20%"
                        isModal={true}
                      />

                      <Button title="Open" onPress={() => setOpen(true)} />
                      <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                          setOpen(false)
                          setDate(date)
                        }}
                        onCancel={() => {
                          setOpen(false)
                        }}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: theme.colors.tableBackgroundColor,
                      borderWidth: 1,
                      borderColor: 'rgb(192, 192, 192)',
                      borderRadius: 8,
                      justifyContent: 'center',
                      marginTop: 25,
                      width: '100%',
                    }}
                  >
                    {estudiantes && estudiantes.length > 0 ? (
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title style={{ flex: 2 }}>Apellidos y Nombres</DataTable.Title>
                          <DataTable.Title style={{ flex: 2, justifyContent: 'center' }}>Estado de Asistencia</DataTable.Title>
                        </DataTable.Header>
                        {estudiantes.map((item, index) => (
                          <DataTable.Row key={index}>
                            <DataTable.Cell style={{ flex: 2 }}>
                              {item.apellido}, {item.nombre}
                            </DataTable.Cell>
                            <DataTable.Cell style={{ flex: 2 }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                                <CustomRadio
                                  options={[
                                    { label: 'Presente', value: 'Presente' },
                                    { label: 'Falta', value: 'Falta' },
                                    { label: 'Justificado', value: 'Justificado' },
                                  ]}
                                  checkedValue={asistencia[index]}
                                  onChange={(value) => handleRadioChange(index, value)}
                                />
                              </View>
                            </DataTable.Cell>
                          </DataTable.Row>
                        ))}
                      </DataTable>
                    ) : (
                      <Text>No hay datos de asistencia.</Text>
                    )}
                  </View>

                  <View style={{ width: '100%', marginTop: 25 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <Button
                        mode="contained"
                        title="Registrar Asistencia"
                        onPress={() => {
                          guardarInformacion();
                        }}
                      >
                        Registrar Asistencia
                      </Button>
                      <Button
                        mode="contained"
                        title="Cerrar"
                        onPress={() => setModalVisible(false)}
                        style={{ marginRight: 10 }}
                      >
                        Cerrar
                      </Button>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </ScrollView>
            {/** Aquí colocamos el Snackbar dentro del Modal, sin Portal */}
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
