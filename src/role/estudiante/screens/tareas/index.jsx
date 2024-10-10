import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { listarHorariosPorSeccionGrado } from '../../../../core/api/horariosService';

const Tareas = () => {
  const [horarios, setHorarios] = useState({});
  const { user } = useContext(AuthContext);
  const seccionId = user.perfil.seccion._id;
  const gradoId = user.perfil.grado._id;

  useEffect(() => {
    const fetchData = async () => {
      const data = await listarHorariosPorSeccionGrado(seccionId, gradoId);
      organizarHorarios(data);
    };

    fetchData();
  }, [seccionId, gradoId]);

  const organizarHorarios = (data) => {
    const horariosPorDiaYHora = {};
    data.forEach(({ dia_semana, hora_inicio, hora_fin, curso }) => {
      const diaAbreviado = dia_semana;
      const hora = `${hora_inicio} - ${hora_fin}`;
      horariosPorDiaYHora[diaAbreviado] = horariosPorDiaYHora[diaAbreviado] || {};
      horariosPorDiaYHora[diaAbreviado][hora] = curso.nombre;
    });
    setHorarios(horariosPorDiaYHora);
  };

  const isSelected = (day, time) => horarios[day] && horarios[day][time];
  const getCellInfo = (day, time) => horarios[day]?.[time] || null;

  const days = ['Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.'];
  const times = [
    '08:00:00 - 08:45:00', 
    '08:45:00 - 09:30:00',
    '09:30:00 - 10:00:00', 
    '10:00:00 - 10:45:00', 
    '10:45:00 - 11:30:00',
    '11:30:00 - 12:15:00', 
    '12:15:00 - 13:00:00'
  ];

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Horario</Text>
      {/* ScrollView externo que permite el desplazamiento horizontal y vertical */}
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.scrollContainer}
      >
        {/* Contenedor fijo para la tabla */}
        <View style={styles.tableContainer}>
          {/* Encabezado */}
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Hora</Text>
            {days.map((day) => (
              <Text key={day} style={styles.headerCell}>{day}</Text>
            ))}
          </View>
          {/* Filas de horario */}
          <ScrollView>
            {times.map((time) => (
              <View key={time} style={styles.row}>
                <Text style={styles.timeCell}>{time}</Text>
                {days.map((day) => (
                  <View
                    key={day}
                    style={[
                      styles.cell,
                      isSelected(day, time) ? styles.selectedCell : {}
                    ]}
                  >
                    {isSelected(day, time) ? (
                      <Text>{getCellInfo(day, time)}</Text>
                    ) : (
                      <Text>-</Text>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  tableContainer: {
    minWidth: 600, // Ancho mínimo fijo de la tabla
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  timeCell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    alignItems: 'center',
  },
  selectedCell: {
    backgroundColor: '#ADD8E6', // Color de celda seleccionada
  },
});

export default Tareas;
