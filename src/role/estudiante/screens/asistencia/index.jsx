import { useEffect, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Menu } from 'react-native-paper';
import { AuthContext } from '../../../../core/context/authContext';
import { AsistenciaContext } from '../../../../core/context/asistenciaContext';
import { PeriodoContext } from '../../../../core/context/periodoContext';
import { useTheme } from '../../../../core/context/themeContext';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

export const Asistencia = () => {
  const { theme } = useTheme();

  const { user } = useContext(AuthContext);
  const { getAsistenciasByMes } = useContext(AsistenciaContext);
  const { fetchPeriodo } = useContext(PeriodoContext);
  const [meses, setMeses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [visible, setVisible] = useState(false);
  const [asistencias, setAsistencias] = useState([]);

  useEffect(() => {
    fetchPeriodo().then(() => {
      getAsistenciasByMes(user.perfil._id, user.perfil.periodo._id).then((data) => {
        setMeses(data);
      });
    });
  }, []);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setVisible(false);
    // Obtener asistencias para el mes seleccionado
    getAsistenciasByMes(user.perfil._id, month).then((data) => {
      setAsistencias(data);
    });
  };

  const getEstadoAsistencia = (item) => {
    if (item.presente) return "Presente";
    if (item.falta) return "Falta";
    if (item.justificada) return "Justificado";
    return "No registrado";
  };

  return (
    <View style={{
      width: '100%', 
      maxWidth: 1300, 
      marginTop: isMediumScreen ? 30 : 15, 
      marginHorizontal: 'auto' }}>
      
      {/* Selector de Mes */}
      <View
        style={{
          flexDirection: isMediumScreen ? 'row' : 'column',  
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 20,
          marginHorizontal: 20,
          zIndex: 2
        }}
      >
        <View style={{ 
          display: 'flex', 
          alignItems: 'center',
          width: isMediumScreen ? '50%' : '100%'   
        }}>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Text style={{
                  fontSize: 15, 
                  fontWeight: 'bold', 
                  color: theme.colors.paperText 
                }}>Selecciona un mes</Text>
              </TouchableOpacity>
            }
          >
            {meses.map((month, index) => (
              <Menu.Item key={index} title={month} onPress={() => handleMonthSelect(month)} />
            ))}
          </Menu>
          {selectedMonth && (
            <Text style={{
              fontSize: 15,
              marginLeft: 10,
              color: theme.colors.paperText
            }}>
              {selectedMonth}
            </Text>
          )}
        </View>
      </View>

      {/* Tabla de Asistencias */}
      <View style={{
        marginHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border
      }}>
        {/* Encabezados de la Tabla */}
        <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
        <Text style={{ flex: 1, fontWeight: 'bold', color:theme.colors.paperText }}>Fecha</Text>
          <Text style={{ flex: 1, fontWeight: 'bold', color:theme.colors.paperText }}>Asistencia</Text>
        </View>

        {/* Filas de la Tabla */}
        <FlatList
          data={asistencias}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
              <Text style={{ flex: 1, color:theme.colors.paperText }}>{item.fecha}</Text>
            <Text style={{ flex: 1, color:theme.colors.paperText }}>{getEstadoAsistencia(item)}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};
