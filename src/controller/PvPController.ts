import { GridItem } from '../model/GridItem';
import { LineOfPositions, PositionsInARow } from '../model/GridState';
import { Position } from '../model/Position';
import allLinesToCheck from './AllLinesToCheckSingleton';
import GameControllerI from './GameControllerI';
import PlayerController from './PlayerController';

class PvPController extends PlayerController implements GameControllerI {
  private copyOfPositionsInARow: PositionsInARow = [];

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

  public move(p: Position, playerTurn: number) {
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
    this.copyOfPositionsInARow = positionsInARow;
    const fourInARow = this.filterFourInARow(positionsInARow);
    return fourInARow;
  }

  public getGridState() {
    return this.gridState;
  }
}

export default PvPController;
