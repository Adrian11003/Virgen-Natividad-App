import { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StripeProvider, CardField } from '@stripe/stripe-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../../../core/context/themeContext';
import { PagosContext } from '../../../../core/context/pagosContext';
import { CustomRadio } from '../../../../shared/components/custom/radio-button/index';
import { useStripe } from '@stripe/stripe-react-native';
import { CustomSnackbar } from '../../../../shared/components/custom/snackbar/index';
import { sendEmailPdf } from '../../../../core/api/gmail';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

export const Pago2 = () => {
  const navigation = useNavigation();
  const stripe = useStripe();
  const { pago, tipoPagoAnterior } = useRoute().params;
  const { theme, themeType } = useTheme();
  const { createPaymentIntent, updatePensionPay, createMatricula } = useContext(PagosContext);

  const [tipoPago, setTipoPago] = useState('boleta');
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [numero, setNumero] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const [snackbarVisible, setSnackbarVisible] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 

  useEffect(() => {
    console.log(pago, tipoPagoAnterior)
  },[])

  const handlePayment = async () => {
    if(!nombre) {
      setSnackbarMessage('El nombre del titular es requerido.');
      setSnackbarVisible(true);
      return
    }

    if(!documento) {
      setSnackbarMessage('El nro. de documento del titular es requerido.');
      setSnackbarVisible(true);
      return
    }

    if(!numero) {
      setSnackbarMessage('El número del titular es requerido.');
      setSnackbarVisible(true);
      return
    }

    if(!correo) {
      setSnackbarMessage('El correo del titular es requerido.');
      setSnackbarVisible(true);
      return
    }

    if(!direccion) {
      setSnackbarMessage('La dirección del titular es requerida.');
      setSnackbarVisible(true);
      return
    }

    if (!cardDetails?.complete) {
      setSnackbarMessage('Los datos de la tarjeta son requeridos.');
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      paymentMethodType: 'Card',
      card: cardDetails,
      paymentMethodData: {
        billingDetails: {
          name: nombre,
          email: correo,
          phone: numero,
          address: {
            line1: direccion,
            city: 'Lima',
            state: 'Departamento de Lima',
            country: 'PE',
          },
        },
      }
    });

    if (error) {
      console.log('Error al crear el PaymentMethod:', error.message);
      setLoading(false);
      return;
    }

    const montoPension = 150;
    const montoTotal = pago.length * montoPension * 3.33;

    const paymentData = {
      nombre_completo: nombre,
      monto: tipoPagoAnterior === 'Pension' ? montoTotal : 1000,
      divisa: 'PEN',
      paymentMethodId: paymentMethod.id,
      metadata: {
        direccion,
        tipoDocumento: tipoPago === 'boleta' ? 'Dni' : 'Ruc',
        nroDocumento: documento,
        tipoServicio: tipoPagoAnterior === 'Pension' ? 'Pension' : 'Matricula',
      },
    };

    createPaymentIntent(paymentData)
      .then(async (data) => {
        console.log(data);
        if (tipoPagoAnterior === 'Pension') {
          await Promise.all(pago.map(async (pension) => {
            await updatePensionPay(pension._id)
              .then((data) => {
                // enviarCorreoConBoleta(data.stripeOperationId)
              })
          }));
        } else {
          const matriculaData = {
            monto: pago[0].monto,
            metodo_pago: pago[0].metodo_pago,
            n_operacion: pago[0].n_operacion,
            periodo_id: pago[0].tipoMa,
            estudiante_id: pago[0].estudiante_id,
            tipo: pago[0].tipo,
            tipoMa: pago[0].tipoMa,
            fecha: new Date()
          };
          createMatricula(matriculaData)
            .then((data) => {
              console.log(data)
            })
            .catch((error) => {
              console.log(error)
              throw error
            })
        }
      })
      .catch((error) => {
        console.log(error.error.message)
      })
      .finally(() => {
        setLoading(false);
        setTipoPago('boleta');
        setNombre('');
        setDocumento('');
        setNumero('');
        setCorreo('');
        setDireccion('');
        setCardDetails({});

        navigation.navigate('Pago1', {
          resetSelectedTipoPago: true,
        });
      })
  };

  // const enviarCorreoConBoleta = (operationId) => {
  //   const correoData = {
  //     to: correo,
  //     subject: 'Comprobante de Pago - Virgen de la Natividad',
  //     dni: documento
  //   };

  //   sendEmailPdf(operationId, correoData)
  //     .then((data) => {
  //       console.log(data);
  //       setSnackbarVisible(true);
  //       setSnackbarMessage('Se le ha enviado la boleta a su correo adjuntado en el pago.');
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  const volver = () => {
    navigation.navigate('Pago1');
  };

  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}>
      <ScrollView vertical={true} style={{ marginBottom: 45 }}>
        { loading && <ActivityIndicator size="large" color="#0000ff" /> }
        <View 
          style={{
            flex: 1,
            width: '100%',
            maxWidth: 1300,
            marginTop: isMediumScreen ? 30 : 15,
            marginHorizontal: 'auto',
            paddingHorizontal: 20
          }}
        >
          <Button
            mode="contained"
            icon="arrow-left"
            onPress={() => volver()}
            style={{ flexDirection: 'row-reverse', alignItems: 'center', width: 110, marginBottom: 20 }}
          >
            Volver
          </Button>

          <Text 
            style={{ 
              marginBottom: 15, 
              color: theme.colors.paperText 
            }}
          >
            Seleccione el tipo de pago: 
          </Text>

          <View 
            style={{ 
              borderWidth: 1, 
              borderColor: theme.colors.lineColor, 
              height: 80,
              borderRadius: 10, 
              justifyContent: 'center',
              backgroundColor: theme.colors.backgroundColorPago 
            }}
          >
            <View style={{ width: 230, padding: 10 }}>
              <CustomRadio
                options={[
                  { label: 'Boleta', value: 'boleta' },
                  { label: 'Factura', value: 'factura' },
                ]}
                checkedValue={tipoPago}
                onChange={setTipoPago}
              />
            </View>
          </View>

          <View 
            style={{ 
              borderWidth: 1, 
              borderColor: theme.colors.lineColor, 
              height: 'auto',
              borderRadius: 10, 
              padding: 10,
              justifyContent: 'center',
              gap: 10,
              marginTop: 15,
              paddingHorizontal: 10,
              backgroundColor: theme.colors.backgroundColorPago 
            }}
          >
            <Text 
              style={{ 
                color: theme.colors.paperText, 
                fontWeight: 'semibold', 
                fontSize: 16, 
                paddingStart: 20,
                paddingTop: 20
              }}
            >
              Datos Personales:
            </Text>

            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              paddingHorizontal: 20
            }}>
              {/* Nombre */}
              <View style={{
                flexBasis: '100%',
                marginRight: 10,
                marginBottom: 10,
                ...(isMediumScreen && { flexBasis: '48%' })
              }}>
                <TextInput
                  label="Nombre"
                  mode="outlined"
                  value={nombre}
                  onChangeText={text => setNombre(text)}
                  style={{
                    marginBottom: 10,
                    height: 50
                  }}
                  right={
                    <TextInput.Icon
                      icon="account"
                      color="#666"
                      size={24}
                    />
                  }
                />
              </View>

              {/* Nro. Documento (DNI o RUC) */}
              <View style={{
                flexBasis: '100%',
                marginRight: 10,
                marginBottom: 10,
                ...(isMediumScreen && { flexBasis: '48%' }) 
              }}>
                <TextInput
                  label={tipoPago === 'boleta' ? 'DNI' : 'RUC'}
                  mode="outlined"
                  value={documento}
                  onChangeText={text => setDocumento(text)}
                  style={{
                    marginBottom: 10,
                    height: 50
                  }}
                  right={
                    <TextInput.Icon
                      icon="card-account-details"
                      color="#666"
                      size={24}
                    />
                  }
                />
              </View>

              {/* Teléfono */}
              <View style={{
                flexBasis: '100%',
                marginRight: 10,
                marginBottom: 10,
                ...(isMediumScreen && { flexBasis: '48%' }) 
              }}>
                <TextInput
                  label="Teléfono"
                  mode="outlined"
                  value={numero}
                  onChangeText={text => setNumero(text)}
                  style={{
                    marginBottom: 10,
                    height: 50
                  }}
                  right={
                    <TextInput.Icon
                      icon="phone"
                      color="#666"
                      size={24}
                    />
                  }
                />
              </View>

              {/* Correo */}
              <View style={{
                flexBasis: '100%',
                marginRight: 10,
                marginBottom: 10,
                ...(isMediumScreen && { flexBasis: '48%' }) 
              }}>
                <TextInput
                  label="Correo"
                  mode="outlined"
                  value={correo}
                  onChangeText={text => setCorreo(text)}
                  style={{
                    marginBottom: 10,
                    height: 50
                  }}
                  right={
                    <TextInput.Icon
                      icon="email"
                      color="#666"
                      size={24}
                    />
                  }
                />
              </View>

              <Text 
                style={{ 
                  color: theme.colors.paperText, 
                  fontWeight: 'semibold', 
                  fontSize: 16, 
                }}
              >
                Datos del Pago:
              </Text>

              <CardField
                postalCodeEnabled={false}
                placeholder={{
                  number: '4242 4242 4242 4242',
                }}
                style={{
                  width: '100%',
                  height: 50,
                  marginVertical: 20,
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: '#666666',
                  backgroundColor: themeType === 'light' ? '#FFFBFF' : '#1B1B1F',
                }}
                cardStyle={{
                  textColor: themeType === 'light' ? '#000' : '#DFDEE2',
                  iconColor: themeType === 'light' ? '#000' : '#DFDEE2'
                }}
                onCardChange={(details) => setCardDetails(details)}
              />

              <Text 
                style={{
                  color: theme.colors.paperText, 
                  fontWeight: 'semibold', 
                  fontSize: 16,
                  marginBottom: 10,
                }}
              >
                Dirección de Facturación:
              </Text>

              <TextInput
                label="Dirección"
                mode="outlined"
                value={direccion}
                onChangeText={text => setDireccion(text)}
                style={{
                  marginBottom: 10,
                  marginBottom: 30,
                  width: '100%',
                  height: 50
                }}
                right={
                  <TextInput.Icon
                    icon="map-marker"
                    color="#666"
                    size={24}
                  />
                }
              />

              <View
                style={{
                  width: '100%',
                  flexDirection: isMediumScreen ? 'row' : 'column',
                  justifyContent: 'space-between',
                  alignItems: isMediumScreen ? 'center' : 'flex-start',
                  marginBottom: 20,
                  gap: 10
                }}
              >
                <Text 
                  style={{
                    color: theme.colors.paperText,
                    fontSize: 14,
                    marginBottom: 10,
                  }}
                >
                  Se enviará la boleta/factura al correo proporcionado durante su contacto.
                </Text>

                <Button 
                  mode="contained"
                  onPress={handlePayment}
                  style={{
                    width: isMediumScreen ? 100 : '100%',
                  }}
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Pagar'}
                </Button>
              </View>
            </View>

          </View>
        </View>
        <CustomSnackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          message={snackbarMessage}
        />
      </ScrollView>
    </StripeProvider>
  );
};