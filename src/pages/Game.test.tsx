import React, { PropsWithChildren } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { GameStateContextProvider } from '../store/GameStateContext';
import Game from './Game';

const Wrapper = ({ children }: PropsWithChildren) => (
  <GameStateContextProvider>
    <MemoryRouter initialEntries={['/game']}>
      <Routes>
        <Route path="/game" element={children} />
      </Routes>{' '}
    </MemoryRouter>{' '}
  </GameStateContextProvider>
);

describe('Game', () => {
  it('should render the game header', () => {
    render(
      <Wrapper>
        <Game />
      </Wrapper>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render the player scores', () => {
    render(
      <Wrapper>
        <Game />
      </Wrapper>
    );

    expect(
      screen.getByRole('heading', { level: 3, name: /player 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /player 2/i })
    ).toBeInTheDocument();
  });

  it('should open the modal when menu is clicked', () => {
    render(
      <Wrapper>
        <Game />
      </Wrapper>
    );

    const menuButton = screen.getByText(/menu/i);
    fireEvent.click(menuButton);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('renders the header, score', () => {
    render(
      <Wrapper>
        <Game />
      </Wrapper>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(
      screen.getByRole('heading', { level: 2, name: /player 1/i })
    ).toBeInTheDocument(); // score
    expect(
      screen.getByRole('heading', { level: 2, name: /player 1/i })
    ).toBeInTheDocument(); // score
  });

  it('increments player 2 score when player 2 wins', () => {
    render(
      <MemoryRouter>
        <GameStateContextProvider status="wonP2">
          <Game />
        </GameStateContextProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('points-2')).toHaveTextContent('1');
    expect(screen.getByTestId('points-1')).toHaveTextContent('0');
  });
});
