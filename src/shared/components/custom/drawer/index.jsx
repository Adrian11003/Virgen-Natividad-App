import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, ImageBackground,TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';

const CustomDrawer = (props) => {
  const { user, handleLogout } = useContext(AuthContext)
  const defaultImage = require('../../../../assets/images/default-profile.jpg');
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#0f172a" }}>
        <ImageBackground style={{paddingStart: 10, paddingBottom: 10 }}>
          <Image
            style={{ marginBottom: 10, height: 80, width: 80, borderRadius: 40 }}
            source={user.perfil.multimedia ? { uri: user.perfil.multimedia.url } : defaultImage}
          />
          <Text style={{ color: 'white' }}>
            {user.perfil.nombre} {user.perfil.apellido}
          </Text>
          <Text style={{ color: '#9ca3af' }}>
            {user.rol}
          </Text>
        </ImageBackground>
        <View style={{ backgroundColor: 'white', paddingBottom: 5 }}>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>
      <View style={{ padding:20 }}>
      <TouchableOpacity onPress={() => handleLogout(navigation)}>
        <Text  style={{ color: '#9ca3af' }}>Cerrar Sesión</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawer