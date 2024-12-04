import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

export const Pago2 = () => {
  const route = useRoute();
  const { pago } = route.params;

  useEffect(() => {
    console.log(pago)
  }, []);

  return (
    <View
      style={{
        flex: 1,
        maxWidth: isMediumScreen ? 1300 : 'auto',
        marginTop: isMediumScreen ? 30 : 15,
        marginHorizontal: isMediumScreen ? 'auto' : 0,
      }}
    >
      <Text>1</Text>
    </View>
  )
}