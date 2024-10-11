import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { listarHorariosPorSeccionGrado } from '../../../../core/api/horariosService';

const Horario = () => {
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
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 16 }}>Horario</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ padding: 16, backgroundColor: '#fff' }}
      >
        <View style={{ minWidth: 600 }}>
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ flex: 1, padding: 8, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc' }}>Hora</Text>
            {days.map((day) => (
              <Text key={day} style={{ flex: 1, padding: 8, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc' }}>{day}</Text>
            ))}
          </View>
          <ScrollView>
            {times.map((time) => (
              <View key={time} style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text style={{ flex: 1, padding: 8, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#ccc' }}>{time}</Text>
                {days.map((day) => (
                  <View
                    key={day}
                    style={{
                      flex: 1,
                      padding: 8,
                      borderRightWidth: 1,
                      borderRightColor: '#ccc',
                      alignItems: 'center',
                      backgroundColor: isSelected(day, time) ? '#ADD8E6' : 'transparent'
                    }}
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

export default Horario;
