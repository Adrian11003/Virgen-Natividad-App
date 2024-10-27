// IconButton.js
import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const IconButton = ({ iconName, color = '#007bff', size = 22, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => { scale.value = withTiming(2, { duration: 100 }); }}
      onPressOut={() => { scale.value = withTiming(1, { duration: 100 }); }}
      onPress={onPress}
    >
      <Animated.View style={[animatedStyle, styles.iconContainer]}>
        <Ionicons name={iconName} size={size} color={color} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: 8,
  },
});

export default IconButton;
