import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet,ScrollView} from 'react-native';
import { AuthContext } from '../../../../core/context/authContext';
import { NotasContext } from '../../../../core/context/notasContext';
import { Button, ProgressBar } from 'react-native-paper';
import { CustomTable } from '../../../../shared/components/custom/table/index';
import { useTheme } from '../../../../core/context/themeContext';
import isMediumScreen from '../../../../shared/constants/screen-width/md';
import { EstudiantesContext } from '../../../../core/context/estudiantesContext';


export const GestionarNotas = () => {
  const { seccionesCursos, loadingSeccionesCursos, getSeccionesCursosByDocente } = useContext(NotasContext);
  const { user } = useContext(AuthContext);
  const [docenteId, setDocenteId] = useState(null);
  const { estudiantes, getEstudiantesBySeccion, loadingEstudiantes } = useContext(EstudiantesContext);
  const { theme } = useTheme();
  
  useEffect(() => {
   
      setDocenteId(user.perfil._id);
    
  }, [user]);

  // Llamamos a getSeccionesCursosByDocente cuando el docenteId esté disponible
  useEffect(() => {
    if (docenteId) {
      getSeccionesCursosByDocente(docenteId);
    }
  }, [docenteId]);

  // Estado para almacenar el nombre de la sección y del curso
  const [seccionNombre, setSeccionNombre] = useState('');
  const [cursoNombre, setCursoNombre] = useState('');

  // Observamos seccionesCursos para extraer el nombre de la sección y curso
  useEffect(() => {
    if (seccionesCursos.length > 0) {
      // Suponiendo que solo queremos mostrar la primera sección y curso
      console.log('Secciones y cursos actualizados:', seccionesCursos);
      const { seccion, curso } = seccionesCursos[0];
      setSeccionNombre(seccion.nombre);
      setCursoNombre(curso.nombre);
      
      // Extraer estudiantes de la sección
      getEstudiantesBySeccion(seccion._id); // Llamar a la función para obtener estudiantes
    }
  }, [seccionesCursos]);

  const columns = [
    { header: 'Alumno', field: 'nombreCompleto' },
    { header: 'DNI', field: 'dni' },
    { header: 'Correo', field: 'correo' },
    { header: 'Notas', field: 'acciones' },
  ];

  const displayedEstudiantes = () => {
    return estudiantes || [];
  };

  console.log("Estudiantes obtenidos:", estudiantes);

  if (loadingEstudiantes || loadingSeccionesCursos) {
    return <ProgressBar indeterminate />;
  }

  return (
    <View style={{ width: '100%', maxWidth: 1300, marginTop: isMediumScreen ? 30 : 15, marginHorizontal: 'auto' }}>
      <View
        style={{
          flexDirection: isMediumScreen ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 20,
          marginHorizontal: 20,
          zIndex: 2,
        }}
      >
        <View style={{ display: 'flex', justifyContent: 'center', width: isMediumScreen ? '50%' : '100%' }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.colors.paperText }}>
            Sección: {seccionNombre}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.colors.paperText }}>
            Curso: {cursoNombre}
          </Text>
        </View>
      </View>
  
      <View style={{ marginHorizontal: 20 }}>
        <CustomTable
          columns={columns}
          data={displayedEstudiantes().map((alumno) => ({
            ...alumno,
            acciones: (
              <Button
                mode="contained"
                style={{ borderRadius: 20 }}
                onPress={() => console.log('Agregar nota para', alumno)}
              >
                Agregar Nota
              </Button>
            ),
          }))}
        />
      </View>
    </View>
  );
};
