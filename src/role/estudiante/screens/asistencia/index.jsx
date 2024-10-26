import { useEffect, useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { AsistenciaContext } from '../../../../core/context/asistenciaContext';
import DropDownPicker from 'react-native-dropdown-picker';

export const Asistencia = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const [items, setItems] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid'},
  ]);

  const { user } = useContext(AuthContext)
  const { semanas, fetchSemanas } = useContext(AsistenciaContext);

  useEffect(() => {
    fetchSemanas();
  }, []);

  useEffect(() => {
    if (semanas && semanas.length > 0) {
      const semanaItems = semanas.map((semana) => ({
        label: semana.nombre, 
        value: semana.id, 
      }));
      setItems(semanaItems);
    }
  }, [semanas]);

  return (
    <>
    <View style={{ justifyContent: 'space-between', fontSize: 16 }}>
      <Text>Seccion: {user.perfil.seccion.nombre}</Text>
      <Text></Text>
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Seleccione una semana"
        />
      </View>
    </View>
    <View style={{
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
    }}>
    <View style={{
      innerWidth: '80%',
    }}>
      <Text>Asistencia</Text>
    </View>
    </View>
    </>
  )
}