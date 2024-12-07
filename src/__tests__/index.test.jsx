import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GestionarNotas } from '../role/docente/screens/gestionar-notas';

// Mocks básicos
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useRoute: () => ({
    params: { seccion: { nombre: 'Sección A' }, curso: { nombre: 'Curso 1' } },
  }),
}));

jest.mock('../core/context/estudiantesContext', () => ({
  EstudiantesContext: {
    Consumer: ({ children }) => children({
      getEstudiantesBySeccion: jest.fn().mockResolvedValue([
        { _id: '1', nombre: 'Juan', apellido: 'Pérez', numero_documento: '12345678' },
        { _id: '2', nombre: 'Ana', apellido: 'Gómez', numero_documento: '23456789' },
      ]),
    }),
  },
}));

describe('GestionarNotas Component', () => {
  it('Debería mostrar el texto de Sección y Curso', () => {
    const { getByText } = render(<GestionarNotas />);
    expect(getByText('Sección: Sección A | Curso: Curso 1')).toBeTruthy();
  });

  it('Debería mostrar a los estudiantes cargados', () => {
    const { getByText } = render(<GestionarNotas />);
    expect(getByText('Juan Pérez')).toBeTruthy();
    expect(getByText('Ana Gómez')).toBeTruthy();
  });

  it('Debería navegar al presionar el botón Volver', () => {
    const { getByText } = render(<GestionarNotas />);
    const volverButton = getByText('Volver');
    fireEvent.press(volverButton);
    expect(useNavigation().navigate).toHaveBeenCalledWith('SeleccionarCursoSeccion');
  });
});