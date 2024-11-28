import { useEffect, useContext, useState } from 'react';
import { Button, ProgressBar } from 'react-native-paper';
import { Modal, View, Text } from 'react-native';
import { useTheme } from '../../../../core/context/themeContext';
import { NotasContext } from '../../../../core/context/notasContext';
import { CustomSelector } from '../../custom/selector';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

export const ModalVisualizarNotas = ({ modalVisible, setModalVisible, data }) => {
  const { theme, themeType } = useTheme();
  const { getBimestres, getNotaByEstudianteCursoBimestrePeriodo } = useContext(NotasContext);

  const [bimestres, setBimestres] = useState([]);
  const [notas, setNotas] = useState([]);
  const [selectedBimestre, setSelectedBimestre] = useState(null);
  const [loading, setLoading] = useState(false);

  const field = 'nombre';

  useEffect(() => {
    if (modalVisible) {
      getBimestres()
        .then((data) => {
          setBimestres(data);
          const primerBimestre = data.find((bimestre) => bimestre.nombre === '1er Bimestre');
          if (primerBimestre) {
            setSelectedBimestre(primerBimestre);
            handleBimestre(primerBimestre);
          }
        })
    }
  }, [modalVisible]);

  const handleBimestre = (item) => {
    setLoading(true);
    getNotaByEstudianteCursoBimestrePeriodo(data.estudiante._id, data.curso._id, item._id, data.periodo._id)
      .then((notasObtenidas) => {
        setLoading(false);
        setSelectedBimestre(item);
  
        // Normalizar las notas asegurando que siempre existan las 4 con '-'
        const tiposNota = ['Exposicion', 'Participacion', 'Bimestral', 'Desempeño en clase'];
        const notasNormalizadas = tiposNota.map((tipo) =>
          notasObtenidas.find((nota) => nota.tipoNota === tipo) || { tipoNota: tipo, nota: '-' }
        );
  
        setNotas(notasNormalizadas);
      })
      .catch(() => {
        setLoading(false);
        setNotas([
          { tipoNota: 'Exposicion', nota: '-' },
          { tipoNota: 'Participacion', nota: '-' },
          { tipoNota: 'Bimestral', nota: '-' },
          { tipoNota: 'Desempeño en clase', nota: '-' }
        ]);
      });
  };

  const handleClose = () => {
    setNotas([])
    setModalVisible(false);
  };

  const BotonCerrar = (
    <Button
      mode="contained"
      onPress={handleClose}
    >
      Cerrar
    </Button>
  )

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View 
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <View 
          style={{ 
            backgroundColor: theme.colors.modalBackground, 
            width: isMediumScreen ? 500 : '90%',
            borderRadius: 10,
            padding: 20, 
            borderColor: 'rgb(192, 192, 192)',
            borderRadius: 8,
          }}
        >
          <View 
            style={{
              zIndex: 10,
              width: '100%'
            }}
          >
            { loading && (
              <View style={{ position: 'absolute', top: -20, left: 0, right: 0, zIndex: 20 }}>
                <ProgressBar indeterminate />
              </View>
            )}
            <View style={{ zIndex: 1000 }}>
              <View style={{ zIndex: 13,marginBottom: 20}}>
                <CustomSelector
                  opciones={bimestres}
                  selectedValue={selectedBimestre}
                  onChange={handleBimestre}
                  placeholder="Bimestres"
                  isModal={true}
                  field={field}
                  modalwidth='100%'
                />
              </View>
            </View>
            <View style={{ marginTop: 5, marginBottom: 15 }}>
              {/* Tabla */}
              <View 
                style={{ 
                  borderWidth: 1,
                  borderColor: themeType === 'light' ? '#DDD' : '#555', 
                  borderRadius: 8, 
                  overflow: 'hidden' 
                }}
              >
                <View 
                  style={{ 
                    flexDirection: 'row', 
                    backgroundColor: themeType === 'light' ? '#fff' : '#333', 
                    paddingVertical: 8, 
                    borderBottomWidth: 1, 
                    borderColor: themeType === 'light' ? '#DDD' : '#555' 
                  }}
                >
                  <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: theme.colors.paperText }}>
                    Tipo de Nota
                  </Text>
                  <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: theme.colors.paperText }}>
                    Nota
                  </Text>
                </View>

                {notas.map((nota, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 8,
                      backgroundColor: themeType === 'light' ? '#fff' : '#333',
                      borderBottomWidth: 1, 
                      borderColor: themeType === 'light' ? '#DDD' : '#555'
                    }}
                  >
                    <Text style={{ flex: 1, textAlign: 'center', color: theme.colors.paperText }}>
                      {nota.tipoNota}
                    </Text>
                    <Text style={{ flex: 1, textAlign: 'center', color: theme.colors.paperText }}>
                      {nota.notaLetra || '-'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
              {BotonCerrar}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}