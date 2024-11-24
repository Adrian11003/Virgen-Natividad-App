import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { useTheme } from '../../../../core/context/themeContext';
import isMediumScreen from '../../../../shared/constants/screen-width/md';
import { DataTable, ProgressBar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { EstudiantesContext } from '../../../../core/context/estudiantesContext';
import { AuthContext } from '../../../../core/context/authContext';
import { NotasContext } from '../../../../core/context/notasContext';
import { listaTiposNota } from '../../../../shared/constants/custom/item-tipo-nota';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


export const Notas = () => {
  const { getEstudianteById } = useContext(EstudiantesContext); // Consumimos el contexto
  const route = useRoute();
  const { getNotaByEstudianteCursoBimestreSeccionTipoNota,getCursoByEstudiante } = useContext(NotasContext);
  const [estudiante, setEstudiante] = useState(null);
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); 
  const [curso, setCurso] = useState(null);
  


  
  // Traer los datos del estudiante
  useEffect(() => {
    setLoading(true);
    getEstudianteById(user.perfil._id).then((data) => {
      setEstudiante(data); 
      setLoading(false);
    });
  }, [user]);
  
  // Traer las notas
  useEffect(() => {
    if (!user.perfil) return;
    
    setLoading(true);
    getCursoByEstudiante(user.perfil._id).then((dataCurso) => {
      console.log(dataCurso);
    }).catch((error) => {
      console.error("Error al obtener el curso del estudiante:", error);
    });
    getNotaByEstudianteCursoBimestreSeccionTipoNota(
      user.perfil._id, 
      user.perfil.curso._id, 
      user.perfil.bimestre._id, 
      user.perfil.seccion._id, 
      listaTiposNota[1]// Asegúrate de que este índice sea el correcto para tu tipo de nota
    ).then((dataNotas) => {
      setNotas(dataNotas); 
      setLoading(false);
    }).catch((error) => {
      console.error("Error al obtener las notas:", error);
      setLoading(false);
    });
  }, [user]);


  if (loading) {
    return <ProgressBar indeterminate />;
  }

  if (!estudiante) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar la información del estudiante.</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notas del Estudiante</Text>

     

      {/* Información básica del estudiante */}
      <View style={styles.infoContainer}>
        <Text style={styles.subHeader}>{`Nombre: ${user.perfil.nombre} ${user.perfil.apellido}`}</Text>
        <Text style={styles.subHeader}>{`DNI: ${user.perfil.numero_documento}`}</Text>
        <Text style={styles.subHeader}>{`Grado: ${user.perfil.grado._id}`}</Text>
        <Text style={styles.subHeader}>{`Sección: ${user.perfil.seccion._id}`}</Text>
        <Text style={styles.subHeader}>{`Periodo: ${user.perfil.periodo._id}`}</Text>
        
      </View>

     {/* Mostrar las notas */}
     <View style={styles.notasContainer}>
        <Text style={styles.notasHeader}>Notas:</Text>
        {notas && notas.length > 0 ? (
          notas.map((nota, index) => (
            <View key={index} style={styles.notaRow}>
              <Text style={styles.notaLabel}>{nota.tipoNota}:</Text>
              <Text style={styles.notaValue}>{nota.nota}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noNotasText}>No hay notas disponibles</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 5,
  },
  notasContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  notasHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  notaLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notaValue: {
    fontSize: 16,
  },
  noNotasText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});