import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';

type Status = 'new' | 'inProgress' | 'wonP1' | 'wonP2' | 'draw' | 'restart';
export type GameStateInContext = {
  playerTurn: 1 | 2;
  status: Status;
  toggleTurn: () => void;
  setStatus: (status: Status) => void;
};

const defaultGameState: GameStateInContext = {
  playerTurn: 1,
  status: 'new',
  toggleTurn: () => {
    throw new Error('missing implementation');
  },
  setStatus: () => {
    throw new Error('missing implementation');
  },
};

export const GameStateContext =
  React.createContext<GameStateInContext>(defaultGameState);

export const GameStateContextProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [playerTurn, setPlayerTurn] = useState<1 | 2>(2);
  const [status, setStatusState] = useState<Status>('new');

  const toggleTurn = useCallback(() => {
    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  }, [playerTurn]);

  const setStatus = useCallback(
    (newStatus: Status) => {
      setStatusState(newStatus);
    },
    [setStatusState]
  );

  const value = useMemo(
    () => ({ playerTurn, status, toggleTurn, setStatus }),
    [playerTurn, toggleTurn, status, setStatus]
  );
  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
