import React from 'react';
import { render } from '@testing-library/react-native';
import { Logo } from '../shared/components/custom/logo/index'

describe('Logo Component', () => {
  it('Se muestra el nombre del colegio.', () => {
    const { getByText } = render(<Logo />);
    
    expect(getByText('Colegio Virgen de la Natividad')).toBeTruthy();
  });
});
