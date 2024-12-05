import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../../screens/home/index';
import { NotasStack } from '../stacks/notasStack';
import { Perfil } from '../../screens/perfil/index';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomDrawer from '../../../../shared/components/custom/drawer';

const Drawer = createDrawerNavigator();

export const DocenteDrawer = () => {
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawer{...props} />} 
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
        options= {{
          drawerIcon: () => <Ionicons name="home-outline" size={22} color="white" />
        }}
      />
      <Drawer.Screen 
        name="Notas" 
        component={NotasStack}
        options={{
          drawerIcon: () => <Ionicons name="checkmark-outline" size={22} color="white" />
        }}
      />
      <Drawer.Screen 
        name="Perfil" 
        component={Perfil} 
        options= {{
          drawerIcon: () => <Ionicons name="person-circle-outline" size={22} color="white" />
        }}
      />
    </Drawer.Navigator>
  );
}