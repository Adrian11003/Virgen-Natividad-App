import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { AsistenciaContext } from '../../../../core/context/asistenciaContext';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { CustomSelector } from '../../../../shared/components/custom/selector/index';
import { useTheme } from '../../../../core/context/themeContext';
import isMediumScreen from '../../../../shared/constants/screen-width/md';
import { ModalNuevaAsistencia } from '../../../../shared/components/modal/modal-asistencia/index';

export const GestionarAsistencia = () => {
  const [selectedSemana, setSelectedSemana] = useState();
  const { user } = useContext(AuthContext);
  const { semanas, fetchSemanas } = useContext(AsistenciaContext);
  const navigation = useNavigation();
  const { theme, themeType } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchSemanas();
  }, []);

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <View
        style={{
          display: 'grid',
          gridTemplateColumns: isMediumScreen ? '3fr 1fr 1fr' : '1fr',
          gap: 12,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.colors.paperText }}>
          Sección: {user.perfil.seccion.nombre}
        </Text>

        <CustomSelector
          opciones={semanas}
          selectedOption={selectedSemana}
          onSelect={(item) => setSelectedSemana(item)}
          placeholder="Semana"
          style={{
            width: '100%',
          }}
        />

        <Button 
          icon="plus" 
          mode="contained" 
          buttonColor={theme.colors.primary}
          onPress={() => setModalVisible(true)}
        >
          Nueva Asistencia
        </Button>
      </View>

      <ModalNuevaAsistencia
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};