import { useEffect, useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { AsistenciaContext } from '../../../../core/context/asistenciaContext';
import { PeriodoContext } from '../../../../core/context/periodoContext';
import { CustomSelector } from '../../../../shared/components/custom/selector';
import DropDownPicker from 'react-native-dropdown-picker';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

export const Asistencia = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  
  const { user } = useContext(AuthContext)
  const {asistenciasMes, getAsistenciasByMes} = useContext(AsistenciaContext);
  const {periodo, fetchPeriodo} = useContext(PeriodoContext);
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);

  useEffect(() => {
    fetchPeriodo()
  }, []);

  useEffect(() => {
    getAsistenciasByMes(user.perfil._id, user.perfil.periodo._id)
  }, [user.perfil._id, user.perfil.periodo._id]);

  console.log(asistenciasMes)

  const columns = [
    { header: 'Fecha', field: 'fecha' },
    { header: 'Presentes', field: 'presentes' },
    { header: 'Faltas', field: 'faltas' },
    { header: 'Justificados', field: 'justificadas' },
  ];


  return (
    <View style={{width: '100%', maxWidth: 1300, marginTop: isMediumScreen ? 30 : 15, marginHorizontal: 'auto' }}>
      <View
        style={{
          flexDirection: isMediumScreen ? 'row' : 'column',  
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 20,
          marginHorizontal: 20,
          zIndex: 2
        }}
      >
        <View 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            width: isMediumScreen ? '50%' : '100%'
          }}
        >
          
        </View>
        <Text style={{ justifyContent: 'center'}}>Asistencia</Text>   
      </View>
      {/* <Datatable>
        <Datatable className="heart">
            
        </Datatable>
      </Datatable> */}
    </View>
  )
}