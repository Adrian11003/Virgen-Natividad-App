import { useContext } from 'react';
import { AuthContext } from './authContext';
import { EstudianteDrawer } from '../../role/estudiante/router/drawer/estudianteDrawer';
import { TutorDrawer } from '../../role/tutor/router/drawer/tutorDrawer'
import { DocenteDrawer } from '../../role/docente/router/drawer/docenteDrawer';
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