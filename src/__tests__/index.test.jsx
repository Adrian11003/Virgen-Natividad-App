import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Logo } from '../shared/components/custom/logo/index';
import { Banner } from '../shared/components/custom/banner/index';
import { GestionarNotas } from '../role/docente/screens/gestionar-notas';

describe('Logo Component', () => {
  it('Se muestra el nombre del colegio.', () => {
    const { getByText } = render(<Logo />);
    expect(getByText('Colegio Virgen de la Natividad')).toBeTruthy();
  });
});

describe('Banner Component', () => {
  it('Ejecuta onPress al presionar', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Banner
        source={{ uri: 'https://example.com/image.jpg' }}
        onPress={mockOnPress}
        title="Test Title"
      />
    );

    fireEvent.press(getByText('Test Title').parent);
    expect(mockOnPress).toHaveBeenCalled();
  });
});

describe('GestionarNotas Component', () => {
  it('debería renderizar el componente con la información dinámica de sección y curso', () => {
    // Simulamos el objeto 'route' que el componente recibe como prop
    const route = {
      params: {
        seccion: { nombre: 'Sección B', _id: '789' },
        curso: { nombre: 'Curso de Historia', _id: '101' },
      },
    };

    // Renderizamos el componente pasándole el objeto 'route'
    const { getByText } = render(<GestionarNotas route={route} />);

    // Verificamos que el texto generado sea dinámico, según los datos pasados
    expect(getByText('Sección: Sección B | Curso: Curso de Historia')).toBeTruthy();
  });
});
