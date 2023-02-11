import React, { useCallback, useContext, useEffect, useState } from 'react';
import style from './game__board__slots.module.scss';
import { GridState } from '../../model/GridState';
import GridStateController from '../../controller/GridStateController';
import {
  GameStateInContext,
  GameStateContext,
} from '../../context/GameStateContext';

type Props = {
  isCPU?: boolean;
};

const GameBoardSlots = (props: Props) => {
  const { isCPU } = props;
  const [gridState, setGridState] = useState<GridState>(
    GridStateController.getInitialState()
  );

  const { playerTurn, toggleTurn, status, setStatus } =
    useContext<GameStateInContext>(GameStateContext);

  useEffect(() => {
    if (status === 'restart' || status === 'new') {
      setGridState(GridStateController.getInitialState());
    }
  }, [status]);

  const handleOnClick = useCallback(
    (column: number, row: number, cpu = false) => {
      if (isCPU && playerTurn === 2 && cpu === false) {
        // do nothing when
        // clicked by a used while it was CPU's turn
      } else if (status === 'inProgress') {
        const controller = new GridStateController(gridState);
        if (cpu) {
          // if cpu calculate next move
          const { columnNo, rowNo } = controller.computeNextCpuMove();
          // apply next move
          controller.applyChange({ columnNo, rowNo }, playerTurn);
        } else {
          // if human apply next move
          controller.applyChange({ columnNo: column, rowNo: row }, playerTurn);
        }
        // if finished update game status
        if (controller.isFinished) {
          setStatus(playerTurn === 1 ? 'wonP1' : 'wonP2');
        } else if (controller.isDraw()) {
          setStatus('draw');
        } else {
          toggleTurn();
        }

        setGridState(controller.GridState);
      }
    },
    [gridState, playerTurn, setStatus, status, toggleTurn, isCPU]
  );

  useEffect(() => {
    if (isCPU && playerTurn === 2) {
      const handle = setTimeout(() => handleOnClick(0, 0, true), 2000);
      return () => clearTimeout(handle);
    }
    return () => {};
  }, [handleOnClick, isCPU, playerTurn]);

  const playerClass =
    playerTurn === 1
      ? style.grid_marker__player_1
      : style.grid_marker__player_2;
  const markerClasses = [style.grid_marker, playerClass].join(' ');

  const buildGridState = () =>
    gridState.map((columnData, columnIndex) => (
      <div key={`${columnIndex + 1}`} className={style.grid__column_container}>
        {columnData.map((gridItem, rowIndex) => (
          <button
            type="button"
            onClick={() => handleOnClick(columnIndex, rowIndex)}
            key={`${columnIndex + 1}_${rowIndex + 1}`}
            disabled={gridItem !== 'isEmpty'}
            data-item={gridItem}
            className={style.grid__item_slot}
          >
            <span className="sr_only">
              {columnIndex}-{rowIndex}
            </span>
          </button>
        ))}
        <div className={markerClasses} />
      </div>
    ));

  return <div className={style.game__board__slots}>{buildGridState()}</div>;
};

export default GameBoardSlots;
