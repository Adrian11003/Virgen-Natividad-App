import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import isMediumScreen from '../../../../../shared/constants/screen-width/md';
import { PagoPantalla1 } from '../step-1';
import { useTheme } from '../../../../../core/context/themeContext';

const Stepper = () => {
  const { theme } = useTheme();
  const [activeStep, setActiveStep] = useState(1);

  const renderStep = (step) => {
    const isActive = activeStep >= step;
   
    return (
      <View key={step} style={styles.stepWrapper}>
        { step === 2 || step === 3 && (
          <View style={[styles.line, { backgroundColor: theme.colors.primary }, { width: isMediumScreen ? 250 : 100 }, isActive && { backgroundColor: theme.colors.primary } ]} />
        )}
        <TouchableOpacity onPress={() => setActiveStep(step)} style={styles.circleWrapper}>
          <View style={[styles.circle, isActive && { backgroundColor: theme.colors.primary }]}>
            <Text style={[{ color: theme.colors.paperText, fontWeight: 'bold' }, isActive && { backgroundColor: theme.colors.primary }]}>
              {step}
            </Text>
          </View>
        </TouchableOpacity>
        { step === 1 && (
          <View style={[styles.line, { backgroundColor: theme.colors.primary }, { width: isMediumScreen ? 250 : 100 }, isActive && { backgroundColor: theme.colors.primary }]} />
        )}
      </View>
    );
  };

  const renderContent = () => {
    switch (activeStep) {
      case 1:
        return <PagoPantalla1 />
      case 2:
        return <Text style={styles.card}>This is step 2 content</Text>;
      case 3:
        return <Text style={styles.card}>This is step 3 content</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.stepContainer, { marginStart: -25, marginTop: -10 }]}>
        <View style={{ marginTop: 70, marginEnd: -62 }}>
          <Text>Tipo de Pago</Text>
        </View>
        {renderStep(1)}
        <View style={{ marginTop: 70, marginEnd: -39 }}>
          <Text>Datos</Text>
        </View>
        {renderStep(2)}
        {renderStep(3)}
        <View style={{ marginTop: 70, marginStart: -36 }}>
          <Text>Pago</Text>
        </View>
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginVertical:20
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleWrapper: {
    zIndex: 1,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 200,
    height: 2,
    zIndex: 0,
  },
  contentContainer: {
    alignItems: 'center',
  },
  card: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default Stepper;