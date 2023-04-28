import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import GridStateController from '../controller/GridStateController';
import { GridState } from '../model/GridState';
import { GridItem } from '../model/GridItem';
import { Position } from '../model/Position';
import ControllerFactory from '../controller/ControllerFactory';
import GameControllerI from '../controller/GameControllerI';

type Status = 'new' | 'inProgress' | 'wonP1' | 'wonP2' | 'draw' | 'restart';
export type GameStateInContext = {
  playerTurn: 1 | 2;
  isCPU: boolean;
  status: Status;
  toggleTurn: () => void;
  setStatus: (status: Status) => void;
  setIsCPU: (isCPU: boolean) => void;
  move: (column: number, row: number) => void;
  getValueAt: (p: Position) => GridItem | undefined;
};

const defaultGameState: GameStateInContext = {
  playerTurn: 1,
  isCPU: false,
  status: 'new',
  toggleTurn: () => {
    throw new Error('missing implementation');
  },
  setStatus: () => {
    throw new Error('missing implementation');
  },
  setIsCPU: () => {
    throw new Error('missing implementation');
  },
  move: () => {
    throw new Error('missing implementation');
  },
  getValueAt: () => {
    throw new Error('missing implementation');
  },
};

export const GameStateContext =
  React.createContext<GameStateInContext>(defaultGameState);

export const GameStateContextProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [playerTurn, setPlayerTurn] = useState<1 | 2>(2);
  const [status, setStatus] = useState<Status>('new');
  const [isCPU, setIsCPU] = useState<boolean>(false);
  const [gridState, setGridState] = useState<GridState>(
    GridStateController.getInitialState()
  );

  const toggleTurn = useCallback(() => {
    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  }, [playerTurn]);

  const updateGameStatus = useCallback(
    (controller: GameControllerI) => {
      // if finished update game status
      switch (controller.getStatus()) {
        case 'isFinished':
          setStatus(playerTurn === 1 ? 'wonP1' : 'wonP2');
          break;
        case 'isDraw':
          setStatus('draw');
          break;
        default:
          toggleTurn();
          break;
      }
      setGridState(controller.getGridState());
    },
    [playerTurn, toggleTurn]
  );

  const move = useCallback(
    (column: number, row: number) => {
      if (playerTurn === 2 && column !== 0) {
        //   // do nothing when
        //   // clicked by a used while it was CPU's turn
      } else if (status === 'inProgress') {
        const controller = new ControllerFactory(isCPU).getController(
          gridState
        );
        controller.move({ columnNo: column, rowNo: row }, playerTurn);
        updateGameStatus(controller);
      }
    },
    [isCPU, playerTurn, status, gridState, updateGameStatus]
  );

  useEffect(() => {
    if (status === 'restart' || status === 'new') {
      setGridState(GridStateController.getInitialState());
    }
  }, [status]);

  useEffect(() => {
    if (isCPU && playerTurn === 2) {
      const handle = setTimeout(() => move(0, 0), 2000);
      return () => clearTimeout(handle);
    }
    return () => {};
  }, [move, isCPU, playerTurn]);

  const getValueAt = useCallback(
    (p: Position) => gridState.at(p.columnNo)?.at(p.rowNo),
    [gridState]
  );

  const value = useMemo(
    () => ({
      playerTurn,
      status,
      isCPU,
      toggleTurn,
      setStatus,
      setIsCPU,
      move,
      getValueAt,
    }),
    [
      playerTurn,
      toggleTurn,
      status,
      isCPU,
      setStatus,
      setIsCPU,
      move,
      getValueAt,
    ]
  );
  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};
