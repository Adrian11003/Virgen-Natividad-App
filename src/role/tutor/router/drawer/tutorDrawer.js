import { createDrawerNavigator } from '@react-navigation/drawer';
import { AsistenciaStack } from '../stack/tutorStack';
import { GestionarComunicados } from '../../screens/gestionar-comunicados/index';
import { Home } from '../../screens/home/index';
import { Perfil } from '../../screens/perfil/index';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomDrawer from '../../../../shared/components/custom/drawer/index';

const Drawer = createDrawerNavigator();

export const TutorDrawer = () => {
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawer{...props} />} 
      initialRouteName="Home"
    >
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options= {{drawerIcon: () => (
          <Ionicons name="home-outline" size={22} />
        )}}
      />
      <Drawer.Screen
        name="Asistencia" 
        component={AsistenciaStack} 
        options={{drawerIcon: () => (
          <Ionicons name="clipboard-outline" size={22} />
        )}}
      />
      <Drawer.Screen
        name="Comunicados" 
        component={GestionarComunicados} 
        options= {{drawerIcon: () => (
          <Ionicons name="chatbubbles-outline" size={22} />
        )}}
      />
      <Drawer.Screen  
        name="Perfil" 
        component={Perfil} 
        options= {{drawerIcon: () => (
          <Ionicons name="person-circle-outline" size={22} />
        )}}
      />
    </Drawer.Navigator>
  );
}