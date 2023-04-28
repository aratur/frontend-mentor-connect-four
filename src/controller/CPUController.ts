import { Position } from '../model/Position';
import GameControllerI from './GameControllerI';
import PlayerController from './PlayerController';
import PvPController from './PvPController';
import { COLS, ROWS } from './constants';

class CPUController extends PlayerController implements GameControllerI {
  private checkIfCpuCanWinNow(): Position | undefined {
    // CPU is always the second player;
    const playerTurn = 2;
    // see what could happen on each move
    const rowNo = 0;
    for (let columnNo = 0; columnNo < COLS; columnNo += 1) {
      const newGridStateController = new PvPController(this.gridState);
      newGridStateController.move({ columnNo, rowNo }, playerTurn);
      if (newGridStateController.getStatus() === 'isFinished') {
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
      const newGridStateController = new PvPController(this.gridState);
      newGridStateController.move({ columnNo, rowNo }, playerTurn);
      if (newGridStateController.getStatus() === 'isFinished') {
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
    const simController = new PvPController(this.gridState);
    simController.move(aRandomMove, 2);
    if (simController.getStatus() === 'isFinished')
      return this.makeARandomMove();

    // 5th avoid naive loose at the start of the game
    const avoidNaiveMove = this.avoidNaiveMove();
    if (avoidNaiveMove !== undefined) return avoidNaiveMove;

    return aRandomMove;
  }

  public move(p: Position, playerTurn: number) {
    const controller = new PvPController(this.gridState);
    if (playerTurn === 2) {
      // if cpu calculate next move
      const { columnNo, rowNo } = this.computeNextCpuMove();
      // apply next move
      controller.move({ columnNo, rowNo }, playerTurn);
    } else {
      // if human apply next move
      controller.move({ ...p }, playerTurn);
    }
    this.gridState = controller.getGridState();
  }
}

export default CPUController;
