import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../../../../core/context/themeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

export const CustomSelector = ({ 
  opciones, 
  selectedValue, 
  onChange, 
  placeholder = 'Selecciona una opción', 
  mobileWidth, 
  isModal,
  field,
  modalwidth,
  isPagoComponent = false, // Nuevo prop
  pagosSeleccionados // Mantener el prop de pagosSeleccionados
}) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const { theme, themeType } = useTheme();

  const handleSelect = (item) => {
    onChange(item);
    setIsSelectorOpen(false);
  };

  const renderItem = ({ item, index }) => {
    // Verificamos si estamos en el componente de pagos
    const isDisabled = isPagoComponent && !item.disabled && index !== 0;
    
    return (
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={{
          padding: 15,
          borderBottomWidth: index === opciones.length - 1 ? 0 : 1,
          borderColor: themeType === 'light' ? '#DDD' : '#555',
          backgroundColor: themeType === 'light' ? '#fff' : '#333',
          opacity: isDisabled ? 0.5 : 1, // Deshabilitar si es el componente de pagos y no es la primera opción
        }}
        disabled={isDisabled} // Solo habilitar la primera opción
      >
        <Text style={{ color: theme.colors.paperText }}>{item[field]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ position: 'relative', zIndex: 1, width: isMediumScreen ? mobileWidth : (isModal ? modalwidth : '100%') }}>
      <TouchableOpacity
        onPress={() => setIsSelectorOpen(!isSelectorOpen)}
        style={{
          padding: 15,
          backgroundColor: themeType === 'light' ? '#E0E0E0' : '#363636', 
          borderRadius: 10,
          borderWidth: 1,
          borderColor: themeType === 'light' ? '#C0C0C0' : '#777', 
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
          <Text style={{ color: theme.colors.paperText }}>
            {selectedValue ? selectedValue[field] : placeholder}
          </Text>
          <Ionicons name="chevron-down" size={17} color={themeType === 'light' ? '#C0C0C0' : '#777'} />
        </View>
      </TouchableOpacity>

      {isSelectorOpen && (
        <View
          style={{
            position: 'absolute',
            top: 60,
            width: '100%',
            backgroundColor: themeType === 'light' ? '#FFF' : '#222', 
            borderWidth: 1,
            borderColor: themeType === 'light' ? '#C0C0C0' : '#555', 
            borderRadius: 10,
            maxHeight: 200,
            zIndex: 10,
            overflow: 'hidden',
          }}
        >
          <FlatList
            data={opciones}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
};
