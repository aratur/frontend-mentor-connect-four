import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import GridStateController from '../controller/GridStateController';
import { GridItem, GridState, Position } from '../model/GridState';

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

  const move = useCallback(
    (column: number, row: number) => {
      if (isCPU && playerTurn === 2 && column !== 0) {
        // do nothing when
        // clicked by a used while it was CPU's turn
      } else if (status === 'inProgress') {
        const controller = new GridStateController(gridState);
        if (isCPU) {
          // if cpu calculate next move
          const { columnNo, rowNo } = controller.computeNextCpuMove();
          // apply next move
          controller.applyChange({ columnNo, rowNo }, playerTurn);
        } else {
          // if human apply next move
          controller.applyChange({ columnNo: column, rowNo: row }, playerTurn);
        }
        // if finished update game status
        if (controller.isFinished) {
          setStatus(playerTurn === 1 ? 'wonP1' : 'wonP2');
        } else if (controller.isDraw()) {
          setStatus('draw');
        } else {
          toggleTurn();
        }

        setGridState(controller.GridState);
      }
    },
    [isCPU, playerTurn, status, gridState, toggleTurn]
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
