import { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ProgressBar, DataTable, IconButton } from 'react-native-paper';
import { useTheme } from '../../../../core/context/themeContext';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../../../core/context/authContext';
import { CustomSelector } from '../../../../shared/components/custom/selector';
import { CustomSnackbar } from '../../../../shared/components/custom/snackbar';
import { PagosContext } from '../../../../core/context/pagosContext';
import { itemTipoPago } from '../../../../shared/constants/custom/item-tipo-pago';
import { PeriodoContext } from '../../../../core/context/periodoContext';
import { ordenarPorMeses } from '../../../../shared/utils/sort-by-months';
import { formatearFecha } from '../../../../shared/utils/format-date';
import { formatSoles } from '../../../../shared/utils/format-sol';
import { useNavigation } from '@react-navigation/native';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

export const Pago1 = () => {
  const { getPensionesByPeriodoEstudiante } = useContext(PagosContext);
  const { fetchPeriodoByAnio } = useContext(PeriodoContext);
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const fieldTipoPago = 'nombre';
  const fieldPension = 'displayField';

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTipoPago, setSelectedTipoPago] = useState(null);
  const [selectedPension, setSelectedPension] = useState(null);
  const [tipoPago, setTipoPago] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [pagosConCampos, setPagosConCampos] = useState([]);
  const [pagosSeleccionados, setPagosSeleccionados] = useState([]);

  const totalPagar = pagosSeleccionados.reduce((total, pago) => total + pago.monto, 0);

  useEffect(() => {
    if (pagos.length > 0) {
      const datosConCampos = pagos.map((pago) => ({
        ...pago,
        displayField: `${pago.mes} - ${pago.periodo?.anio || 'Desconocido'}`,
      }));
      setPagosConCampos(datosConCampos);
    } else {
      setPagosConCampos([]);
    }
  }, [pagos]);

  const handleTipoPagoSelect = async (item) => {
    setLoading(true);
    setSelectedTipoPago(item);
    const anioActual = new Date().getFullYear().toString();
    const periodo = await fetchPeriodoByAnio(anioActual);

    if (item.nombre === 'Pension') {
      setPagos([])
      setPagosSeleccionados([])
      const data = await getPensionesByPeriodoEstudiante(periodo._id, user.perfil._id);
      setTipoPago('Pension');
      console.log(data)
      const datosOrdenados = ordenarPorMeses(data);
      const pensionesFiltradas = datosOrdenados.filter(
        (pension) => pension.estado === 'Vencido' || pension.estado === 'Pendiente'
      );
      if (pensionesFiltradas.length === 0) {
        setSnackbarMessage('El estudiante no cuenta con pensiones pendientes o vencidas.');
        setSnackbarVisible(true);
      }
      setPagos(pensionesFiltradas);
    } else if (item.nombre === 'Matricula 2025') {
      setPagos([])
      setPagosSeleccionados([])
      const data = await getPensionesByPeriodoEstudiante(periodo._id, user.perfil._id);
      setTipoPago('Matricula');
      console.log(data)
      const pensionesFiltradas = data.filter(
        (pension) => pension.estado === 'Vencido' || pension.estado === 'Pendiente'
      );
      if (pensionesFiltradas.length > 0) {
        setSnackbarMessage('Para poder matricular a su hijo en el siguiente año, debe cancelar las pensiones pendientes o vencidas.');
        setSnackbarVisible(true);
      } else {
        setPagosSeleccionados([])
        const dataMatricula = {
          monto: 300,
          metodo_pago: 'Tarjeta',
          n_operacion: Math.floor(10000000 + Math.random() * 90000000).toString(),
          periodo_id: periodo._id,
          estudiante_id: user.perfil._id,
          tipo: 'Virtual',
          tipoMa: 'Regular',
          fecha: new Date().toISOString(),
        };
        setPagosSeleccionados((prev) => [
          ...prev,
          { ...dataMatricula, displayField: 'Matricula 2025', _id: `matricula-${periodo._id}` },
        ]);
        console.log('Matrícula añadida:', dataMatricula);
      }
    }
    setLoading(false);
  };

  const handlePensionSelect = (item) => {
    const esSeleccionado = pagosSeleccionados.some(
      (pago) => pago._id === item._id
    );

    if (esSeleccionado) {
      setPagosSeleccionados(pagosSeleccionados.filter((pago) => pago._id !== item._id));
      setPagos(ordenarPorMeses([...pagos, item]));
    } else {
      setPagosSeleccionados((prev) => [...prev, item]);
      setPagos(pagos.filter((pago) => pago._id !== item._id));
    }
  };

  const handleRemovePago = (item) => {
    if (item.tipo === 'Matricula 2025') {
      setPagos([]);
    } else {
      setPagosSeleccionados((prev) =>
        prev.filter((pago) => pago._id !== item._id)
      );

      setPagos((prev) => {
        const nuevosPagos = prev.filter((pago) => pago._id !== item._id);
        return ordenarPorMeses([...nuevosPagos, item]);
      });
    }
  };

  const handleNavigate = () => {
    if(pagosSeleccionados.length === 0) {
      setSnackbarMessage('Debe seleccionar al menos un pago para continuar.');
      setSnackbarVisible(true);
      return;
    }
    
    navigation.navigate('Pago2', {
      pago: pagosSeleccionados,
      tipoPagoAnterior: tipoPago,
    });
  };

  if (loading) {
    return <ProgressBar indeterminate />;
  }

  return (
    <View
      style={{
        flex: 1,
        maxWidth: isMediumScreen ? 1300 : 'auto',
        marginTop: isMediumScreen ? 30 : 15,
        marginHorizontal: isMediumScreen ? 'auto' : 0,
      }}
    >
      <View style={{ marginHorizontal: 20, flex: 1, zIndex: 21 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            color: theme.colors.paperText,
          }}
        >
          Pagos académicos de {user.perfil.nombre} {user.perfil.apellido}
        </Text>

        <View
          style={{
            flexDirection: isMediumScreen ? 'row' : 'column',
            marginBottom: 20,
            gap: 15,
            zIndex: 20
          }}
        >
          <View style={{ zIndex: 19, width: isMediumScreen ? '20%' : '100%' }}>
            <CustomSelector
              opciones={itemTipoPago}
              selectedValue={selectedTipoPago}
              onChange={(item) => handleTipoPagoSelect(item)}
              placeholder="Seleccione Tipo de Pago"
              mobileWidth="100%"
              isModal={false}
              field={fieldTipoPago}
              pagosSeleccionados={[]}
              isPagoComponent={false}
            />
          </View>

          {tipoPago === 'Pension' && pagosConCampos.length > 0 && (
            <View style={{ zIndex: 18, width: '100%' }}>
              <CustomSelector
                opciones={pagosConCampos}
                selectedValue={selectedPension}
                onChange={(item) => handlePensionSelect(item)}
                placeholder="Seleccione la Pensión"
                mobileWidth="20%"
                isModal={false}
                field={fieldPension}
                pagosSeleccionados={pagosSeleccionados}
                isPagoComponent={true}
              />
            </View>
          )}
        </View>

        <View style={{ height: isMediumScreen ? 630 : 450, zIndex: 19 }}>
          <ScrollView vertical={true}>
            <ScrollView horizontal={true}>
              <DataTable style={{ marginTop: 20, width: isMediumScreen ? 1300 : 900 }}>
                <DataTable.Header style={{ backgroundColor: theme.colors.surface }}>
                  <DataTable.Title style={{ flexGrow: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: theme.colors.paperText }}>Descripción</Text>
                  </DataTable.Title>
                  <DataTable.Title style={{ flexGrow: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: theme.colors.paperText }}>Importe</Text>
                  </DataTable.Title>
                  { tipoPago === 'Pension' && (
                    <>
                      <DataTable.Title style={{ flexGrow: 1 }}>
                        <Text style={{ fontWeight: 'bold', color: theme.colors.paperText }}>Estado</Text>
                      </DataTable.Title>
                      <DataTable.Title style={{ flexGrow: 1 }}>
                        <Text style={{ fontWeight: 'bold', color: theme.colors.paperText }}>Fecha. Vencimiento</Text>
                      </DataTable.Title>      
                    </>           
                  )}
                  <DataTable.Title style={{ flexGrow: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: theme.colors.paperText }}>Acciones</Text>
                  </DataTable.Title>
                </DataTable.Header>

                {pagosSeleccionados.length > 0 &&
                  pagosSeleccionados.map((pago) => (
                    <DataTable.Row key={pago._id}>
                      <DataTable.Cell>{pago.displayField}</DataTable.Cell>
                      <DataTable.Cell>{formatSoles(pago.monto)}</DataTable.Cell>
                      { tipoPago === 'Pension' && (
                        <>
                          <DataTable.Cell>{formatearFecha(pago.fecha_limite)}</DataTable.Cell>
                          <DataTable.Cell>{pago.estado}</DataTable.Cell>
                        </>
                      )}
                      <DataTable.Cell>
                        <IconButton
                          icon="delete"
                          color={theme.colors.error}
                          size={20}
                          onPress={() => handleRemovePago(pago)}
                        />
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
              </DataTable>
            </ScrollView>
          </ScrollView>

          <DataTable>
            <DataTable.Row>
              <DataTable.Cell style={{ justifyContent: 'flex-start' }}>
                <Text style={{ fontWeight: 'bold', color: theme.colors.paperText }}>
                  Total a pagar:
                </Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ justifyContent: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>
                  {formatSoles(totalPagar)}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 30 }}>
            <Button
              mode="contained"
              style={{ width: 150 }}
              buttonColor={theme.colors.primary}
              onPress={() => handleNavigate()}
            >
              Continuar
            </Button>
          </View>
        </View>
      </View>

      <CustomSnackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        message={snackbarMessage}
      />
    </View>
  );
};