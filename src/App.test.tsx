import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component with Board content', () => {
  render(<App />);

  const boardContainer = screen.getByTestId('board-container');

  expect(boardContainer).toBeInTheDocument();
});