import {
  GridItem,
  GridState,
  LineOfPositions,
  Position,
  PositionsInARow,
} from '../model/GridState';
import allLinesToCheck from './AllLinesToCheckSingleton';

const cols = 7;
const rows = 6;

class GridStateController {
  private gridState: GridState;

  public isFinished = false;

  constructor(gridState: GridState) {
    const copyOfGridState = [...gridState.map((r) => [...r])];
    this.gridState = copyOfGridState;
  }

  private getColumn(columnNo: number) {
    return this.gridState.at(columnNo);
  }

  private getValueAt(p: Position): GridItem | undefined {
    return this.gridState.at(p.columnNo)?.at(p.rowNo);
  }

  private translateToValidTargetPosition(p: Position): Position {
    const targetColumn = p.columnNo;
    const column = this.getColumn(targetColumn);
    if (column === undefined) return p;
    const lastEmptyCellRow = column.reduce<number>(
      (result, currentValue, currentIndex) =>
        currentValue === 'isEmpty' ? currentIndex : result,
      p.rowNo
    );
    return { columnNo: targetColumn, rowNo: lastEmptyCellRow };
  }

  private updateValue(p: Position, playerTurn: number) {
    this.gridState[p.columnNo][p.rowNo] =
      playerTurn === 1 ? 'player1' : 'player2';
  }

  private markWinners(input: Array<Position>, playerTurn: number) {
    // mark as won
    const winner: GridItem = playerTurn === 1 ? 'winnerP1' : 'winnerP2';
    input.forEach((p) => {
      this.gridState[p.columnNo][p.rowNo] = winner;
    });
  }

  applyChange(p: Position, playerTurn: number) {
    const targetPosition = this.translateToValidTargetPosition(p);
    this.updateValue(targetPosition, playerTurn);
    const fourInARow = this.getFourInARow(targetPosition, playerTurn);

    if (fourInARow.length >= 1) {
      this.isFinished = true;
      this.markWinners(
        fourInARow.map((item) => item.playerTokens).flat(),
        playerTurn
      );
    }
  }

  private filteredLinesToCheck(p: Position) {
    const filteredLinesToCheck = allLinesToCheck.filter((i) =>
      i.positions.some((f) => f.columnNo === p.columnNo && f.rowNo === p.rowNo)
    );
    return filteredLinesToCheck;
  }

  private pushToArrayIfInProximityOrEmpty(
    input: Array<Position>,
    p: Position
  ): Array<Position> {
    // if empty push
    if (input.length === 0) {
      input.push(p);
    } else {
      const lastItem = input.at(-1);
      // if in proximity (of 1 in each direction) push
      if (
        lastItem &&
        Math.abs(lastItem.columnNo - p.columnNo) <= 1 &&
        Math.abs(lastItem.rowNo - p.rowNo) <= 1
      ) {
        input.push(p);
      } else if (input.length < 4) {
        // if not empty and not in proximity,
        // and not 4 in a row
        // override previous coordinates' array with current
        // in other words start counting from scratch
        return [p];
      }
    }
    return input;
  }

  private positionsInARow(
    filteredLinesToCheck: Array<LineOfPositions>,
    playerTurn: number
  ): PositionsInARow {
    // at input each line contains coordinates of
    // full line on vertical axis, horizontal....
    // at output each line contains coordinates of
    // only points that are in a row
    const positionsInARow = filteredLinesToCheck.map((item) => {
      const { positions, name } = item;
      const player: GridItem = playerTurn === 1 ? 'player1' : 'player2';
      let playerTokens: Array<Position> = [];
      for (const p of positions) {
        if (this.getValueAt(p) === player) {
          playerTokens = this.pushToArrayIfInProximityOrEmpty(playerTokens, p);
        }
      }
      return { name, playerTokens };
    });
    return positionsInARow;
  }

  private filterFourInARow(positionsInARow: PositionsInARow) {
    // filter out coordinates that have 4 or more in a row;
    const fourInARow = positionsInARow.filter(
      ({ playerTokens }) => playerTokens.length >= 4
    );
    return fourInARow;
  }

  private getFourInARow(p: Position, playerTurn: number) {
    const filteredLinesToCheck = this.filteredLinesToCheck(p);
    const positionsInARow = this.positionsInARow(
      filteredLinesToCheck,
      playerTurn
    );
    const fourInARow = this.filterFourInARow(positionsInARow);
    return fourInARow;
  }

  static getInitialState(): Array<Array<GridItem>> {
    return new Array(cols).fill(new Array(rows).fill('isEmpty'));
  }

  public get GridState() {
    return this.gridState;
  }
}

export default GridStateController;
