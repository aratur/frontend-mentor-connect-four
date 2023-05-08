/* eslint-disable jest/no-conditional-expect */
import React, { PropsWithChildren } from 'react';
import {
  render,
  screen,
  fireEvent,
  logDOM,
  logRoles,
  act,
} from '@testing-library/react';
import { vi } from 'vitest';
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

const debugGameBoard = () => {
  for (let i = 0; i < 6; i += 1) {
    for (let j = 0; j < 6; j += 1) {
      console.log(
        `slot_${i}-${j}`,
        screen.getByTestId(`slot_${i}-${j}`).getAttribute('data-item')
      );
    }
  }
};

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

  it('allow player 2 to make a valid move', () => {
    render(
      <MemoryRouter>
        <GameStateContextProvider status="new">
          <Game />
        </GameStateContextProvider>
      </MemoryRouter>
    );
    const move1 = screen.getByTestId(`slot_${0}-${5}`);
    fireEvent.click(move1);

    expect(screen.getByTestId(`slot_${0}-${5}`)).toHaveAttribute(
      'data-item',
      'player1'
    );
    const move2 = screen.getByTestId(`slot_${1}-${5}`);
    fireEvent.click(move2);

    expect(screen.getByTestId(`slot_${1}-${5}`)).toHaveAttribute(
      'data-item',
      'player2'
    );
  });

  it('when a PvP game is won dismiss further moves', () => {
    render(
      <MemoryRouter>
        <GameStateContextProvider status="new">
          <Game />
        </GameStateContextProvider>
      </MemoryRouter>
    );
    const player1Moves = [
      [0, 5],
      [0, 4],
      [0, 3],
      [0, 2],
    ];
    const player2Moves = [
      [1, 5],
      [1, 4],
      [1, 3],
      [1, 2],
    ];

    for (let i = 0; i < 4; i += 1) {
      const testId1 = `slot_${player1Moves[i][0]}-${player1Moves[i][1]}`;
      fireEvent.click(screen.getByTestId(testId1));
      const testId2 = `slot_${player2Moves[i][0]}-${player2Moves[i][1]}`;
      fireEvent.click(screen.getByTestId(testId2));
      if (i < 3) {
        expect(screen.getByTestId(testId1)).toHaveAttribute(
          'data-item',
          'player1'
        );
        expect(screen.getByTestId(testId2)).toHaveAttribute(
          'data-item',
          'player2'
        );
      }
      if (i === 3) {
        expect(screen.getByTestId(testId1)).toHaveAttribute(
          'data-item',
          'winnerP1'
        );
        expect(screen.getByTestId(testId2)).toHaveAttribute(
          'data-item',
          'isEmpty'
        );
      }
    }
  });
});
