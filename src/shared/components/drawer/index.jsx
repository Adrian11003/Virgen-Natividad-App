import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, ImageBackground,TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../../core/context/authContext';
import { useContext } from 'react';

const CustomStudentDrawer = (props) => {
  const { user ,logoutHandler} = useContext(AuthContext)

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#0f172a" }}>
        <ImageBackground style={{ padding: 5 }}>
          <Image
            style={{ marginBottom: 10, height: 80, width: 80, borderRadius: 40 }}
            source={{ uri: user.perfil.multimedia.url }}
          />
          <Text style={{ color: 'white' }}>
            {user.perfil.nombre} {user.perfil.apellido}
          </Text>
          <Text style={{ color: '#9ca3af' }}>
            {user.rol}
          </Text>
        </ImageBackground>
        <View style={{ backgroundColor: 'white' }}>
          <DrawerItemList {...props}/>
        </View>
      </DrawerContentScrollView>
      <View style={{padding:20}}>
    <TouchableOpacity onPress={logoutHandler}>
      <Text  style={{ color: '#9ca3af' }}>Cerrar Sesión</Text>
    </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomStudentDrawer