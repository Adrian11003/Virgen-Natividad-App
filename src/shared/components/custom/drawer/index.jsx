import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import React, { useContext, useState } from 'react';
import { Switch } from 'react-native-paper';
import { useTheme } from '../../../../core/context/themeContext';

const CustomDrawer = (props) => {
  const { user, handleLogout } = useContext(AuthContext);
  const { theme, toogleThemeType } = useTheme();
  const defaultImage = require('../../../../assets/images/default-profile.jpg');
  const [isSwitchOn, setIsSwitchOn] = useState(theme === 'dark');
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    toogleThemeType();
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <ImageBackground style={{ paddingStart: 10, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ marginBottom: 10, height: 80, width: 80, borderRadius: 40 }}
              source={user.perfil.multimedia ? { uri: user.perfil.multimedia.url } : defaultImage}
            />
            <View style={{marginLeft:20}}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {isSwitchOn ? 'Tema: claro' : 'Tema: Oscuro'}
            </Text>
              <Switch
                color='#9ca3af'
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
               
              />
            </View>
          </View>
          <Text style={{ color: 'white' }}>
            {user.perfil.nombre} {user.perfil.apellido}
          </Text>
          <Text style={{ color: '#9ca3af' }}>
            {user.rol}
          </Text>
        </ImageBackground>
        <View style={{ paddingBottom: 5 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text style={{ color: '#9ca3af' }}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawer;
