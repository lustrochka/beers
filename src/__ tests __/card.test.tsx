import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '../components/card/card';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { server } from './mocks/server';
import { http } from 'msw';
import { BASE_URL } from './mocks/handlers';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <Card
              data={{
                id: '8',
                name: 'Black Beer',
                abv: 8,
                ibu: 12,
                type: 'ale',
                country: 'Belarus',
                description: 'Some awful beer',
              }}
            ></Card>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

describe('Card', () => {
  it('renders data correctly', async () => {
    expect(screen.getByText(/Black/)).toBeInTheDocument();
    expect(screen.getByText(/awful/)).toBeInTheDocument();
  });

  it('opens a detailed card component on clicking', async () => {
    waitFor(() => {
      const card = screen.getByText(/Black/);
      userEvent
        .click(card)
        .then(() =>
          waitFor(() =>
            expect(screen.getByText(/Belarus/i)).toBeInTheDocument()
          )
        );
    });
  });

  it('triggers an additional API call to fetch detailed information', async () => {
    const mockGet = jest.fn();
    server.use(
      http.get(BASE_URL, () => {
        mockGet();

        return new Response(JSON.stringify({ data: {} }));
      })
    );
    waitFor(() => {
      const card = screen.getByText(/Black/);
      userEvent
        .click(card)
        .then(() => waitFor(() => expect(mockGet).toHaveBeenCalled()));
    });
  });
});
