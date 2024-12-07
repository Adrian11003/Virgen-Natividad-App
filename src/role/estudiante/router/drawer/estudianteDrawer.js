import { createDrawerNavigator } from '@react-navigation/drawer';
import { Asistencia } from '../../screens/asistencia/index';
import { Home } from '../../screens/home/index';
import { Notas } from '../../screens/notas';
import { PagosStack } from '../../router/stacks/pagosStack';
import { Perfil } from '../../screens/perfil';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomDrawer from '../../../../shared/components/custom/drawer/index';

const Drawer = createDrawerNavigator();

export const EstudianteDrawer = () => {
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawer {...props} />} 
      initialRouteName="Home" 
      screenOptions={{
        drawerActiveTintColor: 'white', 
        drawerInactiveTintColor: 'white', 
        drawerLabelStyle: { fontSize: 16 }, 
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options={{
          drawerIcon: () => <Ionicons name="home-outline" size={22} color="white" />,
        }} 
      />
      <Drawer.Screen 
        name="Asistencia" 
        component={Asistencia} 
        options={{
          drawerIcon: () => <Ionicons name="clipboard-outline" size={22} color="white" />,
        }} 
      />
      <Drawer.Screen 
        name="Notas" 
        component={Notas} 
        options={{
          drawerIcon: () => <Ionicons name="checkmark-outline" size={22} color="white" />,
        }} 
      />
      <Drawer.Screen 
        name="Pagos" 
        component={PagosStack} 
        options={{
          drawerIcon: () => <Ionicons name="cash-outline" size={22} color="white" />,
        }} 
      />
      <Drawer.Screen 
        name="Perfil" 
        component={Perfil} 
        options={{
          drawerIcon: () => <Ionicons name="person-circle-outline" size={22} color="white" />,
        }} 
      />
    </Drawer.Navigator>
  );
}
