import { useEffect, useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, DataTable } from 'react-native-paper';
import { AuthContext } from '../../../../core/context/authContext';
import { AsistenciaContext } from '../../../../core/context/asistenciaContext';
import { PeriodoContext } from '../../../../core/context/periodoContext';
import { useTheme } from '../../../../core/context/themeContext';
import { CustomSnackbar } from '../../../../shared/components/custom/snackbar/index';
import { CustomSelector } from '../../../../shared/components/custom/selector/index';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

export const Asistencia = () => {
  const { theme } = useTheme();
  const field = 'anio';
  const { user } = useContext(AuthContext);
  const { getMesesFromAsistenciaByEstudiante,
    getAsistenciaByPeriodoMesEstudiante
   } = useContext(AsistenciaContext);

  const { fetchPeriodo } = useContext(PeriodoContext);
  const [snackbarVisible, setSnackbarVisible] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [meses, setMeses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [visible, setVisible] = useState(false);
  const [asistencias, setAsistencias] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);
  const [periodos, setPeriodos] = useState([]);

  useEffect(() => {
    fetchPeriodo()
    .then((data) => { 
      setPeriodos(data) 
      getMesesFromAsistenciaByEstudiante(user.perfil._id, user.perfil.periodo._id)
      .then((data) => {
        setMeses(data);
        console.log(data)
      })
    })
  }, []);

  const handleMonthSelect = (month) => {
    console.log(selectedPeriodo)
    if (!selectedPeriodo) {
      setSnackbarMessage('Seleccione un periodo');
      setSnackbarVisible(true);
      return;
    }
    setSelectedMonth(month);
    setVisible(false);
    if (user?.perfil?._id) {
      getAsistenciaByPeriodoMesEstudiante(selectedPeriodo._id, month, user.perfil._id)
        .then((data) => {
          console.log(data)
          setAsistencias(data);
        })
    }
  };

  const getEstadoAsistencia = (item) => {
    console.log(item)
    if (item.estado === 'Presente') return "Presente";
    if (item.estado === 'Falta') return "Falta";
    if (item.estado === 'Justificado') return "Justificado";
    return "No registrado";
  };

  return (
    <View style={{
      flex: 1,
      width: '100%',
      maxWidth: 1300,
      marginTop: isMediumScreen ? 30 : 15,
      marginHorizontal: 'auto'
    }}>
      <View style={{
        marginHorizontal: 20,
      }}>
       {/* Título */}
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: theme.colors.paperText
      }}>
        Observaciones de la asistencia
      </Text>
      <View style={{
        flexDirection: 'row',
        marginBottom: 20,
        flexWrap: 'wrap',
        zIndex: 2
      }}>
          <CustomSelector
              opciones={periodos}
              selectedValue={selectedPeriodo}
              onChange={(item) => setSelectedPeriodo(item)}
              placeholder="Todos los periodos"
              mobileWidth="20%"
              isModal={false}
              field={field}
            />
      </View>

      {/* Selector de Mes */}
      <View style={{
        flexDirection: 'row',
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 8
      }}>
        {meses.map((month, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleMonthSelect(month)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: selectedMonth === month ? 
                theme.colors.primary : theme.colors.surface,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.colors.border
            }}
          >
            <Text style={{
              color: selectedMonth === month ? 
                theme.colors.onPrimary : theme.colors.paperText
            }}>
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

    {/* Tabla de Asistencias */}
        <DataTable>
          {/* Encabezados */}
          <DataTable.Header style={{ backgroundColor: theme.colors.surface }}>
            <DataTable.Title style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', 
                color: theme.colors.paperText }}>Fecha</Text>
            </DataTable.Title>
            <DataTable.Title style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', 
                color: theme.colors.paperText }}>Estado</Text>
            </DataTable.Title>
          </DataTable.Header>

          {/* Filas de Asistencias */}
          {(asistencias || []).map((item, index) => (
            <DataTable.Row key={index} style={{ 
              borderBottomWidth: 1, 
              borderBottomColor: theme.colors.border }}>
              <DataTable.Cell style={{ flex: 1, color: theme.colors.paperText }}>
                {item.fecha}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1, color: theme.colors.paperText }}>
                {getEstadoAsistencia(item)}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      <CustomSnackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            message={snackbarMessage}
          />
    </View>
  );
};