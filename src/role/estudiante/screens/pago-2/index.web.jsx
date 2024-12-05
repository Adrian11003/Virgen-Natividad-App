import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../../../core/context/themeContext';
import { TextInput, Button } from 'react-native-paper'
import { CustomRadio } from '../../../../shared/components/custom/radio-button/index';
import { useNavigation } from '@react-navigation/native';
import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

const stripePromise = loadStripe(process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const Pago2 = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { pago, tipoPagoAnterior } = useRoute().params;

  useEffect(() => {
    console.log(pago, tipoPagoAnterior)
  },[])
  
  const [tipoPago, setTipoPago] = useState('boleta');
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [numero, setNumero] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = () => {
    console.log('Datos enviados:', formData);
  };

  const volver = () => {
    navigation.navigate('Pago1');
  }

  return (
    <ScrollView vertical={true} style={{ marginBottom: 45 }}>
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

            <View style={styles.cardContainer}>
              <Elements stripe={stripePromise}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',  // Tamaño de texto
                        color: '#32325d',  // Color de texto
                        fontWeight: '500',  // Peso de la fuente
                        padding: '10px', // Padding para el contenido de la tarjeta
                      },
                    },
                  }}
                />
              </Elements>
            </View>

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
              label="Correo"
              mode="outlined"
              value={direccion}
              onChangeText={text => setDireccion(text)}
              style={{
                marginBottom: 10,
                marginBottom: 30,
                width: '100%'
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
                onPress={handleSubmit}
                style={{
                  width: isMediumScreen ? 100 : '100%',
                }}
              >
                Pagar
              </Button>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 50,
    padding: 16,
    border: '1px solid #666',
    borderRadius: 3,
    backgroundColor: '#FFFBFF',
    marginVertical: 20,
    position: 'relative',
  },
});