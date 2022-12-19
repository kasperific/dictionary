import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page header', () => {
  render(<App />);
  const linkElement = screen.getByTestId(document.documentElement, 'header-element');
  expect(linkElement).toBeInTheDocument();
});
