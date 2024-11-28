import { useContext } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../../core/context/themeContext';
import { AuthContext } from '../../../../core/context/authContext';
import { CustomSelector } from '../../../../shared/components/custom/selector';
import isMediumScreen from '../../../../shared/constants/screen-width/md';

export const Pagos = () => {
  // const {  }
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  // const {  } =
  
  return (
    <View style={{
      flex: 1,
      width: '100%',
      maxWidth: 1300,
      marginTop: isMediumScreen ? 30 : 15,
      marginHorizontal: 'auto'
    }}>
      <View style={{ marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            color: theme.colors.paperText,
          }}
        >
          Pagos académicos de {user.perfil.nombre} {user.perfil.apellido}
        </Text>

        <View style={{
          flexDirection: 'row',
          marginBottom: 20,
          flexWrap: 'wrap',
          zIndex: 2
        }}>
          <CustomSelector
            opciones={periodos}
            selectedValue={selectedPeriodo}
            onChange={(item) => handlePeriodoSelect(item)}
            placeholder="Todos los periodos"
            mobileWidth="20%"
            isModal={false}
            field={field}
          />
        </View>

        {/* <DataTable>
          <DataTable.Header style={{ backgroundColor: theme.colors.surface }}>
            <DataTable.Title style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', color: theme.colors.paperText }}>Curso</Text>
            </DataTable.Title>
            <DataTable.Title style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', color: theme.colors.paperText }}>Ver</Text>
            </DataTable.Title>
          </DataTable.Header>

          {(enp || []).map((item, index) => (
            <DataTable.Row key={index} style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
              <DataTable.Cell style={{ flex: 1, color: theme.colors.paperText }}>
                {item.curso.nombre}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1, color: theme.colors.paperText }}>
                <Button
                  mode="contained-tonal"
                  onPress={() => visualizarNotas(item._id)}
                >
                  Notas
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable> */}
      </View>
    </View>
  )
}