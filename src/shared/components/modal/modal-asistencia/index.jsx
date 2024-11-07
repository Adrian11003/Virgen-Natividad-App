import { View, Text, Modal, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Animated} from 'react-native';
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
import DatePicker from 'react-native-modern-datepicker';
import formatDate from '../../../constants/dates/format-date';
import formatMonth from '../../../constants/dates/format-month';

export const ModalNuevaAsistencia = ({ modalVisible = false, setModalVisible, seccion = '', dataType = 'create', id, onAsistenciaGuardada }) => {
  const { 
    semanas, 
    fetchSemanas,
    getResumenAsistencia, 
    createResumenAsistencia,
    getResumenAsistenciaById,
    updateResumenAsistencia,
    getAsistenciasBySeccionFecha,
    createAsistencia,
    updateAsistencia
  } = useContext(AsistenciaContext);

  const { user } = useContext(AuthContext);
  const { getEstudiantesBySeccion } = useContext(EstudiantesContext);
  const { theme, isDarkTheme } = useTheme();

  const [selectedSemana, setSelectedSemana] = useState(null);
  const [asistencia, setAsistencia] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [editAsistencia, setEditAsistencia] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const convertirFecha = (fechaString) => {
    const [dia, mes, anio] = fechaString.split('-');
    return new Date(anio, mes - 1, dia);
  };  

  if (dataType === undefined) {
    return null;
  }

  useEffect(() => {
    setLoading(true);
    fetchSemanas();
    if (dataType === 'create') {
      setAsistencia([]);
      setEditAsistencia([]);
      getEstudiantesBySeccion(user.perfil.seccion._id)
        .then((data) => {
          setEstudiantes(data);
          setLoading(false);
        })
    }
  
    if (dataType === 'edit') {
      setAsistencia([]);
      getResumenAsistenciaById(id)
        .then((data) => {
          setSelectedDate(convertirFecha(data.fecha))
          setSelectedSemana(data.semana)
          getAsistenciasBySeccionFecha(data.seccion._id, data.fecha)
            .then((data) => {
              console.log(data)
              setAsistencia(data.map(item => ({ ...item })));
              setLoading(false);
            })
        })
    }
  }, [dataType, id]);

  const handleRadioChange = (index, tipo) => {
    if (dataType === 'edit') {
      const newEditAsistencia = [...asistencia];
      newEditAsistencia[index].estado = tipo;
      setEditAsistencia(newEditAsistencia);
      console.log(editAsistencia)
    } else {
      const newAsistencia = [...asistencia];
      newAsistencia[index] = tipo;
      setAsistencia(newAsistencia);
    }
  };

  const handleSemanaChange = (semana) => {
    setSelectedSemana(semana);
    if (dataType === 'edit') {
      const updatedEditAsistencia = editAsistencia.map(item => ({
        ...item,
        semana: semana._id,
      }));
      setEditAsistencia(updatedEditAsistencia);
    }
  };
  
  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const handleDateChange = (date) => {
    const newDate = new Date(date);
    setSelectedDate(newDate);
    hideDatePicker();
  
    if (dataType === 'edit') {
      const updatedEditAsistencia = editAsistencia.map(item => ({
        ...item,
        fecha: formatDate(newDate),
        mes: formatMonth(newDate), 
      }));
      setEditAsistencia(updatedEditAsistencia);
    }
  };
  
  const guardarInformacion = async () => {
    setLoading(true);
    if (dataType === 'create') {
      if (!selectedSemana) {
        setSnackbarMessage('Por favor, selecciona una semana.');
        setSnackbarVisible(true);
        setLoading(false);
        return;
      }

      if (asistencia.length !== estudiantes.length || asistencia.some(estado => estado === "")) {
        setSnackbarMessage('Debe seleccionar la asistencia de todos los estudiantes');
        setSnackbarVisible(true);
        setLoading(false);
        return;
      }
    
      const promises = estudiantes.map((estudiante, index) => {
        const estado = asistencia[index];
        if (estado === "" || estado === null) {
          console.log(`El estudiante ${estudiante.nombre} no tiene estado asignado.`);
          return Promise.reject(`El estudiante ${estudiante.nombre} no tiene estado asignado.`);
        }
      
        const registro = {
          estudiante_id: estudiante._id,
          seccion_id: estudiante.seccion._id,
          grado_id: estudiante.grado._id,
          periodo_id: estudiante.periodo._id,
          semana_id: selectedSemana._id,
          fecha: formatDate(selectedDate),
          mes: formatMonth(selectedDate),
          estado: estado
        };
      
        return createAsistencia(registro)
          .then((dataAsistencia) => {
            if (index === estudiantes.length - 1) {
              return getResumenAsistencia(dataAsistencia.seccion._id, dataAsistencia.fecha)
                .then((dataRA) => {
                  const resumenData = {
                    semana_id: dataAsistencia.semana._id,
                    seccion_id: dataAsistencia.seccion._id,
                    fecha: dataRA.fecha,
                    presentes: dataRA.totalPresentes,
                    faltas: dataRA.totalFaltas,
                    justificadas: dataRA.totalJustificados,
                  };
                  return createResumenAsistencia(resumenData);
                });
            }
          })
          .catch((error) => {
            console.log("Error al guardar asistencia:", error);
            setLoading(false);
          });
      });
      
      Promise.all(promises)
        .then(() => {
          setLoading(false);
          setAsistencia([]);
          setEditAsistencia([]);
          if (onAsistenciaGuardada) onAsistenciaGuardada();
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
    if (dataType === 'edit') {
      const promises = editAsistencia.map((asistencia, index) => {
        console.log(asistencia)
        const asistenciaData = {
          estudiante_id: asistencia.estudiante._id,
          seccion_id: asistencia.seccion._id,
          grado_id: asistencia.grado._id,
          periodo_id: asistencia.periodo._id,
          semana_id: asistencia.semana,
          fecha: asistencia.fecha,
          mes: asistencia.mes,
          estado: asistencia.estado,
        };
    
        return updateAsistencia(asistencia._id, asistenciaData) // Solo pasamos los datos necesarios
          .then((dataAsistencia) => {
            if (index === editAsistencia.length - 1) {
              return getResumenAsistencia(dataAsistencia.seccion._id, dataAsistencia.fecha)
                .then((dataRA) => {
                  console.log(dataAsistencia)
                  const resumenData = {
                    semana_id: dataAsistencia.semana,
                    seccion_id: dataAsistencia.seccion._id,
                    fecha: dataRA.fecha,
                    presentes: dataRA.totalPresentes,
                    faltas: dataRA.totalFaltas,
                    justificadas: dataRA.totalJustificados,
                  };
                  return updateResumenAsistencia(id, resumenData);
                });
            }
          })
          .catch((error) => {
            console.log("Error al guardar asistencia:", error);
            setLoading(false);
          });
      });
    
      Promise.all(promises)
        .then(() => {
          setLoading(false);
          setAsistencia([]);
          if (onAsistenciaGuardada) onAsistenciaGuardada();
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const handleModalClose = () => {
    setSelectedSemana(null)
    setAsistencia([]);
    setEditAsistencia([]);
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
          }}
        >
          <View
            style={{
              width: isMediumScreen ? '60%' : '90%',
              height: '82%',
              padding: 20,
              backgroundColor: theme.colors.modalBackground,
              borderRadius: 10,
              zIndex: 1000,
            }}
          >
            { loading && <ProgressBar indeterminate /> }
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
                <View style={{zIndex: 2}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text style={{ color: theme.colors.paperText }}>Semana: </Text>
                      
                    <CustomSelector
                      opciones={semanas}
                      selectedOption={selectedSemana}
                      onSelect={(item) => handleSemanaChange(item)}
                      getDisplayValue={(item) => item.nombre}
                      placeholder="Semana"
                      mobileWidth="20%"
                      isModal={true}
                    />

                    <TouchableOpacity 
                      onPress={showDatePicker} 
                      style={{ 
                        marginLeft: 10, 
                        zIndex: 25,
                        padding: 15,
                        backgroundColor: isDarkTheme ? '#363636' : '#E0E0E0', 
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: isDarkTheme ? '#777' : '#C0C0C0', 
                      }}
                    >
                      <Text style={{ color: theme.colors.paperText }}>
                      Fecha: {formatDate(selectedDate)}
                      </Text>
                    </TouchableOpacity>

                    {isDatePickerVisible && (
                      <Modal
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        transparent={true}
                        animationType="fade"
                        visible={isDatePickerVisible}
                        onRequestClose={hideDatePicker}
                      >
                        <SafeAreaView 
                          style={{ 
                            flex: 1, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            width: 400
                          }}
                        >
                          <TouchableWithoutFeedback>
                            <View 
                              style={{ 
                                backgroundColor: 'white', 
                                padding: 5, borderRadius: 10,
                                alignItems: 'center', 
                                width: '70%',
                                zIndex: 25 
                              }}
                            >
                              <DatePicker
                                selected={selectedDate.toISOString()}
                                onDateChange={handleDateChange}
                                mode="calendar"
                              />
                              <Button mode="contained" onPress={hideDatePicker}>
                                Cerrar
                              </Button>
                            </View>
                          </TouchableWithoutFeedback>
                        </SafeAreaView>
                      </Modal>
                    )} 
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
                    {(dataType === 'edit' ? asistencia : estudiantes) ? (
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title style={{ flex: 2 }}>Apellidos y Nombres</DataTable.Title>
                          <DataTable.Title style={{ flex: 2, justifyContent: 'center' }}>Estado de Asistencia</DataTable.Title>
                        </DataTable.Header>
                        {(dataType === 'edit' ? asistencia : estudiantes).map((item, index) => (
                          <DataTable.Row key={index}>
                            <DataTable.Cell style={{ flex: 2 }}>
                              {dataType === 'edit' ? `${item.estudiante.apellido}, ${item.estudiante.nombre}` : `${item.apellido}, ${item.nombre}`}
                            </DataTable.Cell>
                            <DataTable.Cell style={{ flex: 2 }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                                <CustomRadio
                                  options={[
                                    { label: 'Presente', value: 'Presente' },
                                    { label: 'Falta', value: 'Falta' },
                                    { label: 'Justificado', value: 'Justificado' },
                                  ]}
                                  checkedValue={ dataType === 'edit' ? asistencia[index].estado : asistencia[index]}
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

                  <View style={{ width: '100%', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 10 }}>
                      <Button
                        mode="contained"
                        title="Registrar Asistencia"
                        onPress={() => {
                          guardarInformacion();
                        }}
                      >
                        { dataType === 'edit' ? 'Guardar Asistencia' : 'Registrar Asistencia' }
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