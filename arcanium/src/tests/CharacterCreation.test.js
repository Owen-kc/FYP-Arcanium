import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CharacterCreation from '../components/character/CharacterCreation';

// Correct the import paths based on the assumed directory structure
jest.mock('../components/character/RaceForm', () => ({ character, updateCharacter, nextStep }) => (
  <div data-testid="mock-race-form">Race Form Component</div>
));
jest.mock('../components/character/ClassForm', () => () => <div data-testid="mock-class-form">Class Form Component</div>);
// Mock other child components similarly...

describe('CharacterCreation', () => {
  it('renders the RaceForm component on initial render', () => {
    render(<CharacterCreation />);
    expect(screen.getByTestId('mock-race-form')).toBeInTheDocument();
  });

  it('shows the ClassForm component when the "Next" button is clicked', () => {
    render(<CharacterCreation />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByTestId('mock-class-form')).toBeInTheDocument();
  });

  it('returns to the RaceForm component when the "Previous" button is clicked after moving to the next step', () => {
    render(<CharacterCreation />);
    fireEvent.click(screen.getByText('Next')); // Move to ClassForm
    fireEvent.click(screen.getByText('Previous')); // Go back to RaceForm
    expect(screen.getByTestId('mock-race-form')).toBeInTheDocument();
  });
  

  // Additional tests to check if the state updates correctly, or if the final step renders the correct component can be added here.
});
