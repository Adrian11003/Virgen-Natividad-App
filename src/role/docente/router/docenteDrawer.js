import { createDrawerNavigator } from '@react-navigation/drawer';
import { Asistencia } from '../screens/asistencia/index';
import { Comunicados } from '../screens/comunicados/index';
import { Home } from '../screens/home/index';
import { Notas } from '../screens/notas/index';
import { Pagos } from '../screens/pagos/index';
import { Perfil } from '../screens/perfil/index';
import { Tareas } from '../screens/tareas/index';

const Drawer = createDrawerNavigator();

export const DocenteDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen 
        name="Home" 
        component={Home} 
      />
      <Drawer.Screen 
        name="GestionarNotas" 
        component={GestionarNotas} 
      />
      <Drawer.Screen 
        name="GestionarComunicados" 
        component={GestionarComunicados} 
      />
    </Drawer.Navigator>
  );
}