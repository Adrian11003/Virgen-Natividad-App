import { View, Text } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { NotasContext } from '../../../../core/context/notasContext';
import { useState, useEffect, useContext } from 'react';
import { ProgressBar, DataTable, Button } from 'react-native-paper';
import { useTheme } from '../../../../core/context/themeContext';
import { CustomSelector } from '../../../../shared/components/custom/selector';
import { PeriodoContext } from '../../../../core/context/periodoContext';
import { ModalVisualizarNotas } from '../../../../shared/components/modal/modal-visualizar-notas';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

export const Notas = () => {
  const { 
    getEstudianteCursoPeriodoById,
    getEstudianteCursoPeriodoByEstudiantePeriodo,
    getPeriodosByEstudiante
   } = useContext(NotasContext);
  const { getPeriodoById } = useContext(PeriodoContext)
  const { user } = useContext(AuthContext); 
  const { theme } = useTheme();

  const [enp, setEnp] = useState(null);
  const [periodos, setPeriodos] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const field = 'anio';

  useEffect(() => {
    setLoading(true);
    getPeriodosByEstudiante(user.perfil._id)
      .then((periodoIds) => 
        Promise.all(periodoIds.map((id) => getPeriodoById(id)))
      )
      .then((results) => {
        setPeriodos(results);
        setLoading(false);
      })
  }, []);

  const handlePeriodoSelect = (item) => {
    const periodoId = item._id;
    setSelectedPeriodo(item);
    getEstudianteCursoPeriodoByEstudiantePeriodo(user.perfil._id, periodoId)
      .then((data) => {
        setEnp(data);
      })
  };

  const visualizarNotas = (id) => {
    getEstudianteCursoPeriodoById(id)
      .then((data) => {
        setModalData(data);
        setModalVisible(true);
      })
  }

  if (loading) {
    return <ProgressBar indeterminate />
  }

  return (
    <View style={{
      flex: 1,
      width: '100%',
      maxWidth: 1300,
      marginTop: isMediumScreen ? 30 : 15,
      marginHorizontal: 'auto'
    }}>
      <View style={{ marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            color: theme.colors.paperText,
          }}
        >
          Notas de {user.perfil.nombre} {user.perfil.apellido}
        </Text>

        <View style={{
          flexDirection: 'row',
          marginBottom: 20,
          flexWrap: 'wrap',
          zIndex: 2
        }}>
          <CustomSelector
            opciones={periodos}
            selectedValue={selectedPeriodo}
            onChange={(item) => handlePeriodoSelect(item)}
            placeholder="Todos los periodos"
            mobileWidth="20%"
            isModal={false}
            field={field}
          />
        </View>

        <DataTable>
          <DataTable.Header style={{ backgroundColor: theme.colors.surface }}>
            <DataTable.Title style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', color: theme.colors.paperText }}>Curso</Text>
            </DataTable.Title>
            <DataTable.Title style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', color: theme.colors.paperText }}>Ver</Text>
            </DataTable.Title>
          </DataTable.Header>

          {(enp || []).map((item, index) => (
            <DataTable.Row key={index} style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
              <DataTable.Cell style={{ flex: 1, color: theme.colors.paperText }}>
                {item.curso.nombre}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1, color: theme.colors.paperText }}>
                <Button
                  mode="contained-tonal"
                  onPress={() => visualizarNotas(item._id)}
                >
                  Notas
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      <ModalVisualizarNotas
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={modalData}
      />
    </View>
  )
}