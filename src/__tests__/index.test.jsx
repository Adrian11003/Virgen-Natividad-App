import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Logo } from '../shared/components/custom/logo/index';
import { Banner } from '../shared/components/custom/banner/index';

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