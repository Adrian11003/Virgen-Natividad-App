import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../../../core/context/themeContext';

export const CustomRadio = ({ options, checkedValue, onChange, style }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {options.map((option) => {
        let active = checkedValue === option.value;
        return (
          <TouchableOpacity 
            style={active ? [styles.radio, styles.activeRadio] : styles.radio} 
            onPress={() => {
              onChange(option.value);
            }}
            key={option.value}
          >
            <MaterialIcons
              name={active ? "radio-button-on" : "radio-button-off"}
              size={24}
              color={theme.colors.radioButtonColor}
              style={{ marginRight: 5 }}
            />
            <Text style={{ color: theme.colors.paperText }}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  radio: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15
  },
});
