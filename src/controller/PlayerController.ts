import { GridItem } from '../model/GridItem';
import { GridState } from '../model/GridState';
import { Position } from '../model/Position';
import { ROWS, COLS } from './constants';

class PlayerController {
  public gridState: GridState;

  public isFinished = false;

  private getInitialState(): Array<Array<GridItem>> {
    return new Array(COLS).fill(new Array(ROWS).fill('isEmpty'));
  }

  constructor(gridState: GridState | null) {
    const notEmptyGridState = gridState || this.getInitialState();
    const copyOfGridState = [...notEmptyGridState.map((r) => [...r])];
    this.gridState = copyOfGridState;
  }

  private getColumn(columnNo: number) {
    return this.gridState.at(columnNo);
  }

  public getValueAt(p: Position): GridItem | undefined {
    return this.gridState.at(p.columnNo)?.at(p.rowNo);
  }

  public translateToValidTargetPosition(p: Position): Position {
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

  getStatus(): 'inProgress' | 'isDraw' | 'isFinished' {
    if (this.isFinished) return 'isFinished';
    if (this.getIsDraw()) return 'isDraw';
    return 'inProgress';
  }

  private getIsDraw(): boolean {
    return (
      this.gridState.flat().filter((item) => item === 'isEmpty').length === 0
    );
  }

  public getGridState() {
    return this.gridState;
  }
}

export default PlayerController;
