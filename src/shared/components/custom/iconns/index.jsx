// IconButton.js
import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export const IconButton = ({ iconName, color, size = 18, onPress }) => {
  const scale = useSharedValue(1);
  const [iconColor, setIconColor] = useState('#717880'); 

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withTiming(1.2, { duration: 200 });
        setIconColor(color); 
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 100 });
        setIconColor('#717880'); 
      }}
      onPress={onPress}
    >
      <Animated.View style={[animatedStyle, styles.iconContainer]}>
        <Ionicons name={iconName} size={size} color={iconColor} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: 8,
  },
});
