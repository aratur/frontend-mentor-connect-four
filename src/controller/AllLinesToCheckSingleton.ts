import { LineOfPositions, LinesToCheck } from '../model/GridState';
import { Position } from '../model/Position';

const cols = 7;
const rows = 6;

// this file generates a list of lines on which a win can be achieved
// module exports the actual array, so it is not calculated multiple times when used

const getCoordinatesOfRowsToCheck = (): LinesToCheck => {
  const rowsToCheck: LinesToCheck = Array(rows).fill({
    name: null,
    positions: Array(cols).fill({}),
  });
  return rowsToCheck.map((rowData, rowNo) => ({
    name: `row_${rowNo}`,
    positions: rowData.positions.map((_, columnNo) => ({ columnNo, rowNo })),
  }));
};

const getCoordinatesOfColumnsToCheck = (): LinesToCheck => {
  const columnsToCheck: LinesToCheck = Array(cols).fill({
    name: null,
    positions: Array(rows).fill({}),
  });
  return columnsToCheck.map((columnData, columnNo) => ({
    name: `col_${columnNo}`,
    positions: columnData.positions.map((_, rowNo) => ({ columnNo, rowNo })),
  }));
};

const calcLineOnRightDiagonal = (p: Position): LineOfPositions => {
  const result: LineOfPositions = {
    name: `rDiagonal_${p.columnNo}_${p.rowNo}`,
    positions: [],
  };
  let xDiagonal = 0;
  for (let { columnNo } = p; columnNo < cols; columnNo += 1) {
    let yDiagonal = 0;
    xDiagonal += 1;
    for (let { rowNo } = p; rowNo >= 0; rowNo -= 1) {
      yDiagonal += 1;
      // console.log(xDiagonal, yDiagonal, columnNo, rowNo);
      if (xDiagonal === yDiagonal) {
        result.positions.push({ columnNo, rowNo });
      }
    }
  }
  return result;
};

const getCoordinatesOfRightDiagonalToCheck = (): LinesToCheck => {
  const rightDiagonalToCheck: LinesToCheck = [];
  const startingCoordinates: Array<Position> = [];
  startingCoordinates.push({ columnNo: 0, rowNo: 3 });
  startingCoordinates.push({ columnNo: 0, rowNo: 4 });
  startingCoordinates.push({ columnNo: 0, rowNo: 5 });
  startingCoordinates.push({ columnNo: 1, rowNo: 5 });
  startingCoordinates.push({ columnNo: 2, rowNo: 5 });
  startingCoordinates.push({ columnNo: 3, rowNo: 5 });
  startingCoordinates.forEach((p) =>
    rightDiagonalToCheck.push(calcLineOnRightDiagonal(p))
  );
  return rightDiagonalToCheck;
};

const calcLineOnLeftDiagonal = (p: Position): LineOfPositions => {
  const result: LineOfPositions = {
    name: `lDiagonal_${p.columnNo}_${p.rowNo}`,
    positions: [],
  };
  let xDiagonal = 0;
  for (let { columnNo } = p; columnNo < cols; columnNo += 1) {
    let yDiagonal = 0;
    xDiagonal += 1;
    for (let { rowNo } = p; rowNo < rows; rowNo += 1) {
      yDiagonal += 1;
      if (xDiagonal === yDiagonal) {
        result.positions.push({ columnNo, rowNo });
      }
    }
  }
  return result;
};

const getCoordinatesOfLeftDiagonalToCheck = (): LinesToCheck => {
  const leftDiagonalToCheck: LinesToCheck = [];
  const startingCoordinates: Array<Position> = [];
  startingCoordinates.push({ columnNo: 0, rowNo: 2 });
  startingCoordinates.push({ columnNo: 0, rowNo: 1 });
  startingCoordinates.push({ columnNo: 0, rowNo: 0 });
  startingCoordinates.push({ columnNo: 1, rowNo: 0 });
  startingCoordinates.push({ columnNo: 2, rowNo: 0 });
  startingCoordinates.push({ columnNo: 3, rowNo: 0 });
  startingCoordinates.forEach((p) =>
    leftDiagonalToCheck.push(calcLineOnLeftDiagonal(p))
  );
  return leftDiagonalToCheck;
};

const calculateAllLinesToCheck = (): LinesToCheck => {
  const allLinesToCheck = [];
  allLinesToCheck.push(...getCoordinatesOfRowsToCheck());
  allLinesToCheck.push(...getCoordinatesOfColumnsToCheck());
  allLinesToCheck.push(...getCoordinatesOfRightDiagonalToCheck());
  allLinesToCheck.push(...getCoordinatesOfLeftDiagonalToCheck());
  return allLinesToCheck;
};

const allLinesToCheck = calculateAllLinesToCheck();

export default allLinesToCheck;
