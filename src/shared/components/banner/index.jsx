import { useState } from 'react';
import { Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../../core/context/themeContext';

export const Banner = ({ source }) => {
  const { themeType } = useTheme();
  const [scaleValue] = useState(new Animated.Value(1)); 

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 1.05,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1, 
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut} 
    >
      <Animated.View style={{ 
        transform: [{ scale: scaleValue }], 
        backgroundColor: themeType === 'light' ? '#fff' : '#141417', 
        borderRadius: 4, 
        borderColor: themeType === 'light' ? '#ccc' : '#3C3C3C',
        borderWidth: 1,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 2, 
        elevation: 3, 
        padding: 8, 
        minHeight: 300, 
        flex: 1, 
        alignItems: 'center',
      }}>
        <Image
          source={source}
          style={{ 
            width: '100%',
            height: '100%',
            borderRadius: 8,
          }}
          resizeMode="cover" 
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};