import { faItalic } from '@fortawesome/free-solid-svg-icons';
import { render, screen } from '@testing-library/react';
import HomeContent from './../components/home-content';

test('renders learn react text field and button', () => {
  render(<HomeContent />);
  const txtLongUrl = screen.getByTestId(/longurl/i);
  expect(txtLongUrl).toBeInTheDocument();
  const txtId = screen.getByTestId(/id/i);
  expect(txtId).toBeInTheDocument();
  const submitBtn = screen.getByTestId(/submitBtn/i);
  expect(submitBtn).toBeInTheDocument();
});


