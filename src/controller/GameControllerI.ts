import { GridState } from '../model/GridState';
import { Position } from '../model/Position';

interface GameControllerI {
  move(p: Position, playerTurn: number): void;
  getStatus(): 'isDraw' | 'isFinished' | 'inProgress';
  getGridState(): GridState;
}

export default GameControllerI;
