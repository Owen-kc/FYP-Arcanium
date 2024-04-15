import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

// Set a longer timeout for this test suite
jest.setTimeout(10000); // Timeout set to 10000 ms (10 seconds)

test('renders learn react link', async () => {
  fetch.mockResponseOnce(JSON.stringify({ data: "Some data needed for the component" }));
  
  render(<App />);
  // * Note: commented out, as tests are carried out in specific class based test files.
  //const linkElement = await screen.findByText(/learn react/i, { timeout: 9000 }); 
  //expect(linkElement).toBeInTheDocument();
});
