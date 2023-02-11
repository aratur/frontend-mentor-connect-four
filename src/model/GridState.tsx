export type GridItem =
  | 'isEmpty'
  | 'player1'
  | 'player2'
  | 'winnerP1'
  | 'winnerP2';
export type GridState = Array<Array<GridItem>>;
export type Position = {
  columnNo: number;
  rowNo: number;
};
export type LineOfPositions = {
  name: string;
  positions: Array<Position>;
};
export type LinesToCheck = Array<LineOfPositions>;

export type PositionsInARow = {
  name: string;
  playerTokens: Position[];
}[];
