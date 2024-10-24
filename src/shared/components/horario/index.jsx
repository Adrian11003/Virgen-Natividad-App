import { View, Text } from 'react-native';
import { useTheme } from '../../../core/context/themeContext';                           

export const Horario = ({ horarios, rol }) => {
  const { themeType, theme } = useTheme()
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
      <View style={{ margin: 5, padding: 6, borderWidth: 1, borderRadius: 4,
        borderColor: themeType === 'light' ? '#ccc' : '#3C3C3C',
        backgroundColor: themeType === 'light' ? '#fff' : '#141417' }}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 9, color: theme.colors.paperText }}>
          Horario del {rol}
        </Text>

        <View style={{ minWidth: '100%', borderRightWidth: 1, borderColor: themeType === 'light' ? 'black' : '#3C3C3C' }}>
          {/* Encabezado con días */}
          <View style={{ flexDirection: 'row', borderTopWidth: 1, borderLeftWidth: 1,
            borderColor: themeType === 'light' ? 'black' : '#3C3C3C' }}>

            <View style={{ width: '15%', padding: 8, borderBottomWidth: 1, 
              backgroundColor: themeType === 'light' ? 'white' : '#292929',
              borderColor: themeType === 'light' ? 'black' : '#3C3C3C' }}>
              <Text style={{ textAlign: 'center', color: theme.colors.paperText }}>Hora</Text>
            </View>

            {days.map((day) => (
              <View 
                key={day} 
                style={{ width: '17%', padding: 8, borderLeftWidth: 1, borderBottomWidth: 1,
                  backgroundColor: themeType === 'light' ? 'white' : '#292929',
                  borderColor: themeType === 'light' ? 'black' : '#3C3C3C'
                }}
              >
                <Text style={{ textAlign: 'center', color: theme.colors.paperText }}>
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {/* Filas con horarios */}
          {times.map((time, index) => (
            <View 
              key={time} 
              style={{ flexDirection: 'row', borderLeftWidth: 1, borderBottomWidth: 1, 
                backgroundColor: themeType === 'light' ? 'white' : '#292929',
                borderColor: themeType === 'light' ? 'black' : '#3C3C3C'
               }}
            >
              <Text style={{ width: '15%', padding: 8, textAlign: 'center', color: theme.colors.paperText }}>
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
                    borderColor: themeType === 'light' ? 'black' : '#3C3C3C',
                    backgroundColor: isSelected(day, time) 
                    ? (themeType === 'light' ? '#ADD8E6' : '#36538B') : 'transparent'
                  }}
                >
                  {isSelected(day, time) ? (
                    <Text style={{ fontSize: 10, textAlign: 'center', color: theme.colors.paperText }} numberOfLines={2}>
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
