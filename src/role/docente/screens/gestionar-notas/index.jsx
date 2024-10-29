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
  const { user } = useContext(AuthContext);
  const { seccionesCursos, getSeccionesCursosByDocente, loadingSeccionesCursos } = useContext(NotasContext);
  const { estudiantes, getEstudiantesBySeccion, loadingEstudiantes } = useContext(EstudiantesContext);
  const { theme } = useTheme();
  
  const [seccionId, setSeccionId] = useState(null);
  const [cursoId, setCursoId] = useState(null);
  const [cursoNombre, setCursoNombre] = useState('');
  const [seccionNombre, setSeccionNombre] = useState('');
  useEffect(() => {
  
      getSeccionesCursosByDocente(user.perfil._id); // Obtener secciones y cursos del docente
    
  }, [user, getSeccionesCursosByDocente]);

  useEffect(() => {
    if (seccionId ) {
      setSeccionId(firstSeccion.seccionId); // Asegúrate que seccionId existe
      setCursoId(firstSeccion.cursoId); // Asegúrate que cursoId existe
      setSeccionNombre(firstSeccion.seccionNombre); // Asegúrate que seccionNombre existe
      setCursoNombre(firstSeccion.cursoNombre); // Asegúrate que cursoNombre existe
      setDocenteId(user.perfil._id);
    }
  }, [seccionId,cursoId]);

  useEffect(() => {
    if (seccionId) {
      getEstudiantesBySeccion(seccionId);
    }
  }, [seccionId, getEstudiantesBySeccion]);

  const columns = [
    { header: 'Alumno', field: 'nombreCompleto' },
    { header: 'DNI', field: 'dni' },
    { header: 'Correo', field: 'correo' },
    { header: 'Notas', field: 'acciones' },
  ];

  const displayedEstudiantes = () => {
    return estudiantes || [];
  };

 

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
