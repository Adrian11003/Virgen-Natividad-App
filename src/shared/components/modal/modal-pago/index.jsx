import React, { useState, useContext } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { Button, Text } from 'react-native-paper';
import { StripeContext } from '../context/StripeContext'; // Importa el contexto

export const ModalPago = () => {
  const [cardDetails, setCardDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { confirmPayment } = useConfirmPayment();
  const { createPaymentIntent } = useContext(StripeContext); // Usa el contexto de Stripe

  // Manejo del pago
  const handlePayPress = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Error', 'Por favor ingresa los detalles completos de la tarjeta.');
      return;
    }

    setLoading(true);
    const billingDetails = {
      email: 'correo@ejemplo.com', // Puedes reemplazar con el correo del usuario
    };

    try {
      // Obtén el client_secret desde el backend usando el contexto
      const { client_secret } = await createPaymentIntent({
        monto: 1099, // Monto en centavos
        divisa: 'usd',
        metadata: { userId: '12345' }, // Datos adicionales
      });

      if (!client_secret) {
        setLoading(false);
        return;
      }

      // Confirma el pago usando el client_secret y los detalles de la tarjeta
      const { paymentIntent, error } = await confirmPayment(client_secret, {
        type: 'Card',
        billingDetails,
      });

      if (error) {
        Alert.alert('Error', `Pago fallido: ${error.message}`);
      } else if (paymentIntent) {
        Alert.alert('Éxito', 'Pago realizado con éxito.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Pago</Text>

      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={styles.cardField}
        onCardChange={(cardDetails) => setCardDetails(cardDetails)}
      />

      <Button
        mode="contained"
        onPress={handlePayPress}
        disabled={loading}
        loading={loading}
        style={styles.button}
      >
        {loading ? 'Procesando...' : 'Pagar'}
      </Button>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  button: {
    marginTop: 20,
  },
});