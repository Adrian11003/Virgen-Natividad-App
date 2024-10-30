import { useState, useEffect } from 'react';
import { Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../../../core/context/themeContext'

export const ButtonIcon = ({ iconName, color, size = 18, onPress }) => {
  const scale = useSharedValue(1);
  const { themeType } = useTheme();
  const [iconColor, setIconColor] = useState((themeType === 'light' ? '#000' : '#fff'));
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    setIconColor(themeType === 'light' ? '#000' : '#fff');
  }, [themeType]);

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withTiming(1.2, { duration: 200 });
        setIconColor(color); 
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 100 });
        setIconColor(themeType === 'light' ? '#000' : '#fff'); 
      }}
      onPress={onPress}
    >
      <Animated.View style={[animatedStyle, { marginEnd: 20 }]}>
        <Ionicons name={iconName} size={size} color={iconColor} />
      </Animated.View>
    </Pressable>
  );
};