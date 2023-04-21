import {
  GridItem,
  GridState,
  LineOfPositions,
  Position,
  PositionsInARow,
} from '../model/GridState';
import allLinesToCheck from './AllLinesToCheckSingleton';

export const COLS = 7;
export const ROWS = 6;

class GridStateController {
  private gridState: GridState;

  public isFinished = false;

  private archPositionsInARow: PositionsInARow = [];

  public get getPositionsInARow(): PositionsInARow {
    return this.archPositionsInARow;
  }

  constructor(gridState: GridState) {
    const copyOfGridState = [...gridState.map((r) => [...r])];
    this.gridState = copyOfGridState;
  }

  private getColumn(columnNo: number) {
    return this.gridState.at(columnNo);
  }

  public getValueAt(p: Position): GridItem | undefined {
    return this.gridState.at(p.columnNo)?.at(p.rowNo);
  }

  private translateToValidTargetPosition(p: Position): Position {
    const targetColumn = p.columnNo;
    const column = this.getColumn(targetColumn);
    if (column === undefined) return p;
    const lastEmptyCellRow = column.reduce<number>(
      (result, currentValue, currentIndex) =>
        currentValue === 'isEmpty' ? currentIndex : result,
      -1
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
    if (targetPosition.rowNo !== -1) {
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
    this.archPositionsInARow = positionsInARow;
    const fourInARow = this.filterFourInARow(positionsInARow);
    return fourInARow;
  }

  static getInitialState(): Array<Array<GridItem>> {
    return new Array(COLS).fill(new Array(ROWS).fill('isEmpty'));
  }

  private checkIfCpuCanWinNow(): Position | undefined {
    // CPU is always the second player;
    const playerTurn = 2;
    // see what could happen on each move
    const rowNo = 0;
    for (let columnNo = 0; columnNo < COLS; columnNo += 1) {
      const newGridStateController = new GridStateController(this.gridState);
      newGridStateController.applyChange({ columnNo, rowNo }, playerTurn);
      if (newGridStateController.isFinished) {
        return { columnNo, rowNo };
      }
    }
    return undefined;
  }

  private checkIfPlayer1IsAboutToWinAndBlock(): Position | undefined {
    // CPU is always the second player;
    // but we are interested in counting opponents positions in the game;
    const playerTurn = 1;
    // see what could happen on each move
    const rowNo = 0;
    for (let columnNo = 0; columnNo < COLS; columnNo += 1) {
      const newGridStateController = new GridStateController(this.gridState);
      newGridStateController.applyChange({ columnNo, rowNo }, playerTurn);
      if (newGridStateController.isFinished) {
        return { columnNo, rowNo };
      }
    }
    return undefined;
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   */
  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private makeARandomMove(): Position {
    let validPosition = { rowNo: -1, columnNo: -1 };
    while (validPosition.rowNo === -1) {
      validPosition = { rowNo: -1, columnNo: this.getRandomInt(0, COLS) };
      validPosition = this.translateToValidTargetPosition(validPosition);
    }
    return validPosition;
  }

  private avoidNaiveMove(): Position | undefined {
    const bottomRowState = this.gridState.map((columnData) =>
      columnData.at(-1)
    );
    const emptySlots = bottomRowState.filter(
      (item) => item !== undefined && item === 'isEmpty'
    );

    if (emptySlots.length === 4 || emptySlots.length === 3) {
      // place a token next to the opponent
      const nextBestMove = bottomRowState.findIndex(
        (emptySlot, indexOfEmptySlot) =>
          emptySlot === 'isEmpty' &&
          bottomRowState.some(
            (player1Slot, indexOfPlayer1Slot) =>
              player1Slot === 'player1' &&
              Math.abs(indexOfEmptySlot - indexOfPlayer1Slot) === 1
          )
      );
      if (nextBestMove !== -1)
        return { columnNo: nextBestMove, rowNo: ROWS - 1 };
    }
    return undefined;
  }

  public computeNextCpuMove(): Position {
    // 1st check if CPU can win, in the current move, if yes return coordinates;
    const winningCoordinates = this.checkIfCpuCanWinNow();
    if (winningCoordinates !== undefined) return winningCoordinates;

    // 2nd check if player 1 is about to win, and block that move
    const blockPlayer1 = this.checkIfPlayer1IsAboutToWinAndBlock();
    if (blockPlayer1 !== undefined) return blockPlayer1;

    // 3rd make a non-winning and non-blocking move
    // a simple strategy is to randomly place the token
    const aRandomMove = this.makeARandomMove();

    // 4th check if by step 3, you allow P1 to win
    // if yes select randomly something again
    // it may happen that it will be the same coordinate
    // I don't want to make this too smart so it's fine
    const simController = new GridStateController(this.gridState);
    simController.applyChange(aRandomMove, 2);
    if (simController.isFinished) return this.makeARandomMove();

    // 5th avoid naive loose at the start of the game
    const avoidNaiveMove = this.avoidNaiveMove();
    if (avoidNaiveMove !== undefined) return avoidNaiveMove;

    return aRandomMove;
  }

  public isDraw(): boolean {
    return (
      this.gridState.flat().filter((item) => item === 'isEmpty').length === 0
    );
  }

  public get GridState() {
    return this.gridState;
  }
}

export default GridStateController;
