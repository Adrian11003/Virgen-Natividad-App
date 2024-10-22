import { useEffect, useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { AsistenciaContext } from '../../../../core/context/asistenciaContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-paper'

export const GestionarAsistencia = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const [items, setItems] = useState([]);

  const { user } = useContext(AuthContext)
  const { semanas, fetchSemanas } = useContext(AsistenciaContext);

  useEffect(() => {
    fetchSemanas();
  }, []);

  useEffect(() => {
    const semanaItems = semanas.map((semana) => ({
      label: semana.nombre,
      value: semana._id,
    }));
    const todasLasSemanasItem = { label: 'Todas las semanas', value: 'todas' };
    setItems([todasLasSemanasItem, ...semanaItems]);
  }, [semanas]);

  return (
    <>
    <View style={{ justifyContent: 'space-between', fontSize: 16 }}>
      <Text>Seccion: {user.perfil.seccion.nombre}</Text>
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
          width: 180
        }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder='Todas las semanas'
        />
      </View>
    </View>
    <Button >
      Ir a Guardar Asistencia
    </Button>
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