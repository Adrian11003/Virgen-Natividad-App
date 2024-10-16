import { View, Text } from 'react-native';

export const Horario = ({ horarios }) => {
  const days = ['Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.'];
  const times = [
    '08:00:00 - 08:45:00',
    '08:45:00 - 09:30:00',
    '09:30:00 - 10:00:00',
    '10:00:00 - 10:45:00',
    '10:45:00 - 11:30:00',
    '11:30:00 - 12:15:00',
    '12:15:00 - 13:00:00',
  ];

  function formatTimeTo12Hour(time24) {
    const [hour, minute] = time24.split(':');
    let hourNum = parseInt(hour);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    
    if (hourNum > 12) {
      hourNum -= 12;
    } else if (hourNum === 0) {
      hourNum = 12;
    }
    
    return `${hourNum}:${minute} ${period}`;
  }
  
  const formattedTimes = times.map(timeRange => {
    const [startTime] = timeRange.split(' - ');
    return formatTimeTo12Hour(startTime);
  });

  const isSelected = (day, time) => horarios[day] && horarios[day][time];
  const getCellInfo = (day, time) => horarios[day]?.[time] || null;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 5, padding: 6, borderColor: '#ccc', borderWidth: 1, backgroundColor: '#fff' }}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 16 }}>
          Horario del Estudiante
        </Text>
    <View style={{ minWidth: '100%', borderRightWidth: 1 }}>
      <View style={{ 
        flexDirection: 'row', 
        borderTopWidth: 1,
        borderLeftWidth: 1, 
      }}>
        <View style={{ 
          width: '15%', 
          padding: 8, 
          borderBottomWidth: 1, 
          }}>
          <Text style={{ textAlign: 'center' }}>Hora</Text>
        </View>
        {days.map((day) => (
          <View 
              key={day} // Agregar la clave aquí para evitar advertencias de React
              style={{ 
                  width: '17%', 
                  padding: 8, 
                  borderLeftWidth: 1,
                  borderBottomWidth: 1, // Corregido el cierre de la propiedad borderWidth
                  textAlign: 'center' // Esta propiedad no debería estar aquí, debes moverla a Text
              }}
          >
              <Text style={{ textAlign: 'center' }}> {/* Aplicar el textAlign en el Text */}
                  {day}
              </Text>
          </View> 
      ))}
  </View>

  {times.map((time, index) => (
          <View key={time} style={{ flexDirection: 'row',   
            borderLeftWidth: 1, 
            borderBottomWidth: 1,  
            borderColor: 'black'  }}>
            <Text style={{ width: '15%', padding: 8, textAlign: 'center' }}>
              {formattedTimes[index]}
            </Text>
            {days.map((day) => (
              <View
                key={day}
                style={{
                  width: '17%',
                  padding: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderLeftWidth: 1,
                  backgroundColor: isSelected(day, time) ? '#ADD8E6' : 'transparent',
                }}
              >
                {isSelected(day, time) ? (
                  <Text
                    style={{ fontSize: 10, textAlign: 'center' }}
                    numberOfLines={2}
                  >
                    {getCellInfo(day, time)}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        ))}


    </View>
      </View>
</View>
  );
};
