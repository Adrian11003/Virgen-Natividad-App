import { createDrawerNavigator } from '@react-navigation/drawer';
import { Asistencia } from '../screens/asistencia/index';
import { Comunicados } from '../screens/comunicados/index';
import { Home } from '../screens/home/index';
import { Notas } from '../screens/notas/index';
import { Pagos } from '../screens/pagos/index';
import { Perfil } from '../screens/perfil/index';
import { Tareas } from '../screens/tareas/index';

const Drawer = createDrawerNavigator();

export const EstudianteDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen 
        name="Home" 
        component={Home} 
      />
      <Drawer.Screen 
        name="Asistencia" 
        component={Asistencia} 
      />
      <Drawer.Screen 
        name="Comunicados" 
        component={Comunicados} 
      />
      <Drawer.Screen 
        name="Notas" 
        component={Notas} 
      />
      <Drawer.Screen 
        name="Pagos" 
        component={Pagos} 
      />
      <Drawer.Screen 
        name="Tareas" 
        component={Tareas} 
      />
      <Drawer.Screen 
        name="Perfil" 
        component={Perfil} 
      />
    </Drawer.Navigator>
  );
}