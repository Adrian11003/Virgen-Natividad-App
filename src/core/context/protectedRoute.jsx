import { useContext } from 'react';
import { AuthContext } from './authContext';
import { EstudianteDrawer } from '../../role/estudiante/router/estudianteDrawer';
import { TutorDrawer } from '../../role/tutor/router/tutorDrawer';
import { DocenteDrawer } from '../../role/docente/router/docenteDrawer';
import { LoginScreen } from '../../auth/index';

export const ProtectedRoute = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!user || !isAuthenticated) {
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
};