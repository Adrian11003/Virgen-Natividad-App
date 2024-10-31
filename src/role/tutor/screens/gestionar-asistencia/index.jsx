import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { AsistenciaContext } from '../../../../core/context/asistenciaContext';
import { Button, ProgressBar } from 'react-native-paper';
import { CustomSelector } from '../../../../shared/components/custom/selector/index';
import { useTheme } from '../../../../core/context/themeContext';
import { ModalNuevaAsistencia } from '../../../../shared/components/modal/modal-asistencia/index';
import { CustomTable } from '../../../../shared/components/custom/table/index';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

export const GestionarAsistencia = () => {
  const [selectedSemana, setSelectedSemana] = useState();
  const { user } = useContext(AuthContext);
  const { semanas, fetchSemanas, getResumenesAsistenciaBySeccion, resumenesAsistencia, loading } = useContext(AsistenciaContext);
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [seccionId, setSeccionId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [dataType, setDataType] = useState(null);

  useEffect(() => {
    fetchSemanas();
    setSeccionId(user.perfil.seccion._id);
  }, [user]);

  useEffect(() => {
    if (seccionId) {
      getResumenesAsistenciaBySeccion(seccionId);
    }
  }, [seccionId]);

  const columns = [
    { header: 'Semana', field: 'semana.nombre' },
    { header: 'Dia', field: 'dia' },
    { header: 'Fecha', field: 'fecha' },
    { header: 'Presentes', field: 'presentes' },
    { header: 'Faltas', field: 'faltas' },
    { header: 'Justificados', field: 'justificadas' },
  ];

  const displayedResumenAsistencia = () => {
    if (!selectedSemana || selectedSemana._id === 'all') return resumenesAsistencia;
    return resumenesAsistencia.filter(item => 
      item.semana._id === selectedSemana._id
    );
  };


  const agregarAsistencia = () => {
    setSelectedId(null);
    setDataType('create')
    setModalVisible(true);
  };

  const editarAsistencia = (id) => {
    setModalVisible(true);
    setDataType('edit')
    setSelectedId(id);
  };

  const eliminarAsistencia = (id) => {
    setModalVisible(true);
    setSelectedId(id);
  };

  if (loading) {
    return <ProgressBar indeterminate />
  }

  return (
    <View style={{ width: '100%', maxWidth: 1300, marginTop: isMediumScreen ? 30 : 15, marginHorizontal: 'auto' }}>
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
        <View 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            width: isMediumScreen ? '50%' : '100%'
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.colors.paperText }}>
            Sección: {user.perfil.seccion.nombre}
          </Text>
        </View>

        <CustomSelector
          opciones={[{ nombre: 'Todas las semanas', _id: 'all' }, ...semanas]}
          selectedOption={selectedSemana}
          onSelect={(item) => setSelectedSemana(item)}
          placeholder="Todas las semanas"
          mobileWidth="20%"
          isModal={false}
        />

        <Button 
          icon="plus" 
          mode="contained" 
          style={{ width: isMediumScreen ? '25%' : '100%' }}
          buttonColor={theme.colors.primary}
          onPress={() => agregarAsistencia()}
        >
          Nueva Asistencia
        </Button>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <CustomTable 
          columns={columns}
          data={displayedResumenAsistencia()}
          onEdit={editarAsistencia}
          onDelete={eliminarAsistencia}
          editActive={true}
          deleteActive={true}
        />
      </View>

      <ModalNuevaAsistencia
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        dataType={dataType}
        seccion={user.perfil.seccion.nombre}
        id={selectedId}
      />
    </View>
  );
};