// model used by the controller and GameBoardSlots component

import { GridItem } from './GridItem';
import { Position } from './Position';

export type GridState = Array<Array<GridItem>>;
export type LineOfPositions = {
  name: string;
  positions: Array<Position>;
};
export type LinesToCheck = Array<LineOfPositions>;

export type PositionsInARow = {
  name: string;
  playerTokens: Position[];
}[];
