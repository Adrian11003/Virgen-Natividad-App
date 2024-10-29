import { View, Text, Modal, ScrollView } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '../../../../core/context/themeContext';
import { CustomSelector } from '../../custom/selector/index'
import { AsistenciaContext } from '../../../../core/context/asistenciaContext';
import { AuthContext } from '../../../../core/context/authContext';
import { Button, ProgressBar, DataTable, RadioButton } from 'react-native-paper';
import { EstudiantesContext } from '../../../../core/context/estudiantesContext';
import isMediumScreen from '../../../constants/screen-width/md';
import fechaFormateada from '../../../constants/today-dateTime';

export const ModalNuevaAsistencia = ({ modalVisible, setModalVisible, seccion, id = null }) => {
  const [selectedSemana, setSelectedSemana] = useState();
  const [seccionId, setSeccionId] = useState(null);
  const { user } = useContext(AuthContext);
  const { semanas, fetchSemanas, loading } = useContext(AsistenciaContext);
  const { getEstudiantesBySeccion, estudiantes } = useContext(EstudiantesContext);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSemanas();
    setSeccionId(user.perfil.seccion._id);
  }, [user]);

  useEffect(() => {
    if (seccionId) {
      getEstudiantesBySeccion(seccionId);
    }
  }, [seccionId]);

  const [asistencia, setAsistencia] = useState([]);

  const handleRadioChange = (index, tipo) => {
    const estudiante = estudiantes[index]; // Obtiene el estudiante actual
    const estado = tipo === 'presente' ? 'Presente' : tipo === 'falta' ? 'Falta' : 'Justificado'; // Determina el estado
  
    // Registra en consola el registro del estudiante con su estado
    console.log(`Registro ${index + 1}: Estudiante ${estudiante.apellido}, ${estudiante.nombre} - Estado: ${estado}`);
  };

  // Nueva función para registrar la asistencia
  const registrarAsistencia = () => {
    const registros = estudiantes.map((estudiante, index) => {
      let estado = '';
      if (estudiante.presente) {
        estado = 'presente';
      } else if (estudiante.falta) {
        estado = 'falta';
      } else if (estudiante.justificado) {
        estado = 'justificado';
      }

      // Solo registrar si hay un estado definido
      if (estado) {
        return {
          registro: index + 1,
          estudiante: `${estudiante.apellido}, ${estudiante.nombre}`,
          estado,
        };
      }
      return null; // Ignorar estudiantes sin estado definido
    }).filter(Boolean); // Filtrar registros nulos

    console.log('Registros de asistencia:', registros);
    // Aquí puedes agregar lógica para enviar estos registros a tu backend si es necesario

  };

  if (loading) {
    return <ProgressBar indeterminate />
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
      setModalVisible(false);
      }}
    >
      <View
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
            zIndex: 10,
          }}
        >
          <ScrollView style={{ flex: 1 }} vertical>
          <ScrollView horizontal>
            <View style={{ width : 940 }}>
              <Text 
                style={{ 
                  fontSize: 16, 
                  marginBottom: 15, 
                  fontWeight: '700', 
                  color: theme.colors.paperText 
                }}
              >
                Sección: {seccion}
              </Text>

              <View style={{ zIndex: 3 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', zIndex: 2 }}>
                  <Text style={{ color: theme.colors.paperText }}>Semana: </Text>
                  
                  <CustomSelector
                    opciones={semanas}
                    selectedOption={selectedSemana}
                    onSelect={(item) => setSelectedSemana(item)}
                    placeholder="Semana"
                    mobileWidth="20%"
                    isModal={true}
                  />

                  <Text style={{ marginStart: 20, color: theme.colors.paperText, width: '40%' }}>Fecha: {fechaFormateada}</Text>
                </View>
              </View>

              <View style={{
                backgroundColor: theme.colors.tableBackgroundColor, 
                borderWidth: 1,
                borderColor: 'rgb(192, 192, 192)',
                borderRadius: 8,
                justifyContent: 'center',
                marginTop: 25,
                width: '100%',
                zIndex: 1
              }}>
                {estudiantes && estudiantes.length > 0 ? (
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title style={{ flex: 3 }}>Apellidos y Nombres</DataTable.Title>
                      <DataTable.Title style={{ flex: 1 }}>Presente</DataTable.Title>
                      <DataTable.Title style={{ flex: 1 }}>Falta</DataTable.Title>
                      <DataTable.Title style={{ flex: 1 }}>Justificado</DataTable.Title>
                    </DataTable.Header>
                    {estudiantes.map((item, index) => (
                      <DataTable.Row key={index}>
                        <DataTable.Cell style={{ flex: 3 }}>{item.apellido}, {item.nombre}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>
                          <RadioButton
                            value={`presente-${index}`}
                            status={item.presente ? 'checked' : 'unchecked'}
                            onPress={() => handleRadioChange(index, 'presente')}
                          />
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>
                          <RadioButton
                            value={`falta-${index}`}
                            status={item.falta ? 'checked' : 'unchecked'}
                            onPress={() => handleRadioChange(index, 'falta')}
                          />
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>
                          <RadioButton
                            value={`justificado-${index}`}
                            status={item.justificado ? 'checked' : 'unchecked'}
                            onPress={() => handleRadioChange(index, 'justificado')}
                          />
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                ) : (
                  <Text>No hay datos de asistencia.</Text>
                )}
              </View>

              <View style={{ width: '100%', zIndex: 1, marginTop: 25 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Button
                    mode="contained"
                    title="Cerrar"
                    onPress={() => setModalVisible(false)}
                    style={{ marginRight: 10 }}  // Espacio entre botones
                  >
                    Cerrar
                  </Button>
                  <Button
                    mode="contained"
                    title="Registrar Asistencia"
                    onPress={() => {
                      registrarAsistencia();
                      setModalVisible(false);
                    }}
                  >
                    Registrar Asistencia
                  </Button>
                </View>
              </View>

            </View>
          </ScrollView>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
