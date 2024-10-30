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
  const { getSeccionesCursosByDocente, secciones, cursos, loadingSeccionesCursos } = useContext(NotasContext);
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
      console.log('DocenteId:', docenteId);
    }
  }, [docenteId]);

  useEffect(() => {
    // Asegúrate de que los datos hayan cargado antes de imprimirlos
    if (!loadingSeccionesCursos) {
      console.log('Secciones:', secciones); // Ver todas las secciones con sus nombres e IDs
      console.log('Cursos:', cursos); // Ver todos los cursos con sus nombres e IDs
      
      // Acceder a datos específicos (por ejemplo, ID de la primera sección y curso)
      if (secciones.length > 0) {
        console.log('Primer Sección - Nombre:', secciones[0].nombre, 'ID:', secciones[0].id);
      }
      if (cursos.length > 0) {
        console.log('Primer Curso - Nombre:', cursos[0].nombre, 'ID:', cursos[0].id);
      }
    }
  }, [secciones, cursos, loadingSeccionesCursos]);
  useEffect(() => {
    getEstudiantesBySeccion(secciones[0].id);
  }, [secciones]);

  

  const columns = [
    { header: 'Alumno', field: 'nombreCompleto' },
    { header: 'DNI', field: 'dni' },
    { header: 'Direccion', field: 'direccion' },
    { header: 'Notas', field: 'acciones' },
  ];

  const displayedEstudiantes = () => {
    return estudiantes.map(estudiante => ({
      nombreCompleto: `${estudiante.nombre} ${estudiante.apellido}`,
      dni: estudiante.numero_documento,
      direccion: estudiante.direccion,
      acciones: (
        <Button 
          mode="contained" 
         
          style={{ backgroundColor: theme.colors.primary }}
        >
          Agregar Notas
        </Button>
      )
    }));
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
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.colors.paperText }}>
            Sección: {secciones[0].nombre}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: theme.colors.paperText }}>
            Sección: {cursos [0].nombre}
          </Text>
        </View>

       
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <CustomTable 
          columns={columns}
          data={displayedEstudiantes()}
        />
      </View>
    </View>
    );
};
