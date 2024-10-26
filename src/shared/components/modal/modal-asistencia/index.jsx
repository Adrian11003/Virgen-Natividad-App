import { View, Text, Modal } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '../../../../core/context/themeContext';
import { CustomSelector } from '../../custom/selector/index'
import { AsistenciaContext } from '../../../../core/context/asistenciaContext';
import { Button } from 'react-native-paper';

export const ModalNuevaAsistencia = ({ modalVisible, setModalVisible, seccion }) => {
  const [selectedSemana, setSelectedSemana] = useState();
  const { semanas, fetchSemanas } = useContext(AsistenciaContext);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSemanas();
  }, []);

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
            width: '80%',
            height: '80%',
            padding: 20,
            backgroundColor: theme.colors.modalBackground,
            borderRadius: 10,
            zIndex: 10,
          }}
        >
          <Text style={{ fontSize: 18, marginBottom: 15 }}>Seccion: {seccion}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', zIndex: 10 }}>
            <Text>Semana: </Text>
            
            <CustomSelector
              opciones={semanas}
              selectedOption={selectedSemana}
              onSelect={(item) => setSelectedSemana(item)}
              placeholder="Semana"
              mobileWidth="20%"
              isModalAsistencia={true} 
            />
          </View>

          <View style={{zIndex: 5, position: 'relative' , marginTop: 20}}>
            <Button
              mode="contained"
              title="Cerrar"
              onPress={() => setModalVisible(false)}
            >
              Cerrar
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
