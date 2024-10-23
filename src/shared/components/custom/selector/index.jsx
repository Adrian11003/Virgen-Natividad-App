import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../../../../core/context/themeContext';
import Ionicons from '@expo/vector-icons/Ionicons';

export const CustomSelector = ({ opciones, selectedOption, onSelect, placeholder = 'Selecciona una opción' }) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const { theme, themeType } = useTheme();

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        onSelect(item);
        setIsSelectorOpen(false);
      }}
      style={{
        padding: 15,
        borderBottomWidth: index === opciones.length - 1 ? 0 : 1,
        borderColor: themeType === 'light' ? '#DDD' : '#555',
        backgroundColor: themeType === 'light' ? '#fff' : '#333'
      }}
    >
      <Text style={{ color: theme.colors.paperText }}>{item.nombre}</Text>
    </TouchableOpacity>
  );
  

  return (
    <View style={{ position: 'relative', zIndex: 1 }}>
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: theme.colors.paperText }}>
          {selectedOption ? selectedOption.nombre : placeholder}
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