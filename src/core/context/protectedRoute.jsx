import { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from './authContext';
import { EstudianteDrawer } from '../../role/estudiante/router/estudianteDrawer';
import { TutorDrawer } from '../../role/tutor/router/tutorDrawer';
import { DocenteDrawer } from '../../role/docente/router/docenteDrawer';
import { LoginScreen } from '../../auth/index';

export const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  switch (user.rol) {
    case 'Tutor':
      return <TutorDrawer />;
    case 'Docente':
      return <DocenteDrawer />;
    case 'Estudiante':
      return <EstudianteDrawer />;
    default:
      return null;
  }
}
