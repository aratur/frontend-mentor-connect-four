import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

test('renders without errors', () => {
  render(<Footer isPaused={false} />);
});
