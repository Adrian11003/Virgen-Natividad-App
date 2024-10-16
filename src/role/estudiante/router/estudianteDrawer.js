import { createDrawerNavigator } from '@react-navigation/drawer';
import { Asistencia } from '../screens/asistencia/index';
import { Comunicados } from '../screens/comunicados/index';
import { Home } from '../screens/home/index';
import { Notas } from '../screens/notas/index';
import { Pagos } from '../screens/pagos/index';
import Perfil from '../screens/perfil';
import Horario from '../screens/horario';
import {Tareas} from '../screens/tareas';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomDrawer from '../../../shared/components/custom/drawer';

const Drawer = createDrawerNavigator();

export const EstudianteDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer{...props} />} initialRouteName="Home">
      <Drawer.Screen options= {{drawerIcon: () => (
        <Ionicons name="home-outline" size={22} />
      )}}
        name="Home" 
        component={Home} 
      />
      <Drawer.Screen  options= {{drawerIcon: () => (
        <Ionicons name="clipboard-outline" size={22} />
      )}}
        name="Asistencia" 
        component={Asistencia} 
      />
      <Drawer.Screen  options= {{drawerIcon: () => (
        <Ionicons name="chatbubbles-outline" size={22} />
      )}}
        name="Comunicados" 
        component={Comunicados} 
      />
      <Drawer.Screen options= {{drawerIcon: () => (
        <Ionicons name="checkmark-outline" size={22} />
      )}} 
        name="Notas" 
        component={Notas} 
      />
      <Drawer.Screen  options= {{drawerIcon: () => (
        <Ionicons name="cash-outline" size={22} />
      )}}
        name="Pagos" 
        component={Pagos} 
      />
      <Drawer.Screen  options= {{drawerIcon: () => (
        <Ionicons name="document-text-outline" size={22} />
      )}}
        name="Tareas" 
        component={Tareas}
      />
      <Drawer.Screen options= {{drawerIcon: () => (
        <Ionicons name="person-circle-outline" size={22} />
      )}} 
        name="Perfil" 
        component={Perfil} 
      />
        <Drawer.Screen options= {{drawerIcon: () => (
        <Ionicons name="calendar-clear-outline" size={22} />
      )}} 
        name="Horario" 
        component={Horario} 
      />
    </Drawer.Navigator>
  );
}