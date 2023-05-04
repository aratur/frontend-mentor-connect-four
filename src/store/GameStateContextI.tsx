import { GridItem } from '../model/GridItem';
import { Position } from '../model/Position';
import { Status } from '../model/Status';

export interface GameStateContextI {
  playerTurn: 1 | 2;
  isCPU: boolean;
  status: Status;
  toggleTurn: () => void;
  setStatus: (status: Status) => void;
  setIsCPU: (isCPU: boolean) => void;
  move: (column: number, row: number) => void;
  getValueAt: (p: Position) => GridItem | undefined;
}
