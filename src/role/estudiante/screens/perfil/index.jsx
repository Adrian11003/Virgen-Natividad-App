import { View, Text } from 'react-native';

export const Perfil = () => {
  return (
    <View style={{
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <View style={{
        innerWidth: '80%',
      }}>
        <Text>Perfil</Text>
      </View>
    </View>
  )
}