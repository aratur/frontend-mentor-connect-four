import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import GridStateController from '../controller/GridStateController';
import { GridState } from '../model/GridState';
import { Position } from '../model/Position';
import ControllerFactory from '../controller/ControllerFactory';
import GameControllerI from '../controller/GameControllerI';
import defaultGameState from './defaultGameState';
import { GameStateContextI } from './GameStateContextI';

export type Status =
  | 'new'
  | 'inProgress'
  | 'wonP1'
  | 'wonP2'
  | 'draw'
  | 'restart';
export const GameStateContext =
  React.createContext<GameStateContextI>(defaultGameState);

interface GameStateContextProviderProps {
  isCPU?: boolean;
  status?: Status;
  playerTurn?: 1 | 2;
}

export const GameStateContextProvider = (
  props: PropsWithChildren<GameStateContextProviderProps>
) => {
  const {
    isCPU: initialIsCPU = false,
    status: initialStatus = 'new',
    playerTurn: initialPlayerTurn = 2,
  } = props;
  const { children } = props;
  const [playerTurn, setPlayerTurn] = useState<1 | 2>(initialPlayerTurn);
  const [status, setStatus] = useState<Status>(initialStatus);
  const [isCPU, setIsCPU] = useState<boolean>(initialIsCPU);
  const [gridState, setGridState] = useState<GridState>(
    GridStateController.getInitialState()
  );

  const toggleTurn = useCallback(() => {
    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  }, [playerTurn]);

  const updateGameStatus = useCallback(
    (controller: GameControllerI) => {
      // if finished update game status
      const newStatus = controller.getStatus();
      switch (newStatus) {
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
      console.log('NewStatus: ', newStatus);

      setGridState(controller.getGridState());
    },
    [playerTurn, toggleTurn]
  );

  const move = useCallback(
    (column: number, row: number) => {
      if (isCPU && playerTurn === 2 && column !== 0) {
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
