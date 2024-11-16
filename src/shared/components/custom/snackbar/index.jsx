import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

export const CustomSnackbar = ({ visible, onDismiss, message }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={3000}
        action={{
          label: 'Cerrar',
          onPress: onDismiss,
        }}
        style={{
          width: isMediumScreen ? '30%' : '90%',
          alignSelf: 'center',
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};