import { useState } from 'react';
import { DataTable } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ButtonIcon } from '../../../../shared/components/custom/button-icon/index';
import { useTheme } from '../../../../core/context/themeContext';
import isMediumScreen from '../../../constants/screen-width/md';

export const CustomTable = ({ columns, data, onEdit, onDelete, editActive, deleteActive }) => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(8);
  const { theme } = useTheme();

  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

  const paginatedData = data.slice(from, to);

  return (
    <View style={{
      backgroundColor: theme.colors.tableBackgroundColor, 
      borderWidth: 1,
      borderColor: 'rgb(192, 192, 192)',
      borderRadius: 8,
      justifyContent: 'center',
      marginBottom: 40,
      width: '100%',
    }}>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header 
            style={{ 
              width: isMediumScreen ? 1300 : 800, 
              borderBottomWidth: 1, 
              borderBottomColor: 'rgb(192, 192, 192)',
            }}
          >
            {columns.map((col, index) => (
              <DataTable.Title 
                style={[styles.header]}
                key={index}
              >
                {col.header}
              </DataTable.Title>
            ))}
            {(editActive || deleteActive) && 
              <DataTable.Title>Acciones</DataTable.Title> 
            }
          </DataTable.Header>

          {paginatedData.map((item) => (
            <DataTable.Row style={[styles.row, { width: isMediumScreen ? 1300 : 800 }]} key={item._id}>
              {columns.map((col, index) => {
                const value = col.field.split('.').reduce((o, key) => (o ? o[key] : ''), item);
                return <DataTable.Cell key={index}>{value}</DataTable.Cell>;
              })}
              {(editActive || deleteActive) && (
                <DataTable.Cell>
                  {editActive && (
                    <ButtonIcon 
                      iconName="pencil" 
                      color="#007bff" 
                      onPress={() => onEdit(item._id)} 
                    />
                  )}
                  {deleteActive && (
                    <ButtonIcon
                      iconName="trash-bin" 
                      color="#ff0000" 
                      onPress={() => onDelete(item._id)} 
                    />
                  )}
                </DataTable.Cell>
              )}
            </DataTable.Row>
          ))}
          
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(data.length / numberOfItemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} de ${data.length}`}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={setNumberOfItemsPerPage}
            showFastPaginationControls
            selectPageDropdownLabel={'Filas por página'}
            style={{ justifyContent: 'flex-start', marginVertical: 10 }}
          />
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(192, 192, 192)',
  },
  header: {
    borderColor: 'rgb(192, 192, 192)'
  },
});
