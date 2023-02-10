import React, { useContext, useEffect, useState } from 'react';
import style from './game__board__slots.module.scss';
import { GridItem, GridState } from '../../model/GridState';
import GridStateController from '../../controller/GridStateController';
import { PlayerTurn, PlayerTurnContext } from '../../context/PlayerTurnContext';

const GameBoardSlots = () => {
  const [gridState, setGridState] = useState<GridState>(
    GridStateController.getInitialState()
  );

  const { playerTurn, toggleTurn, status, setStatus } =
    useContext<PlayerTurn>(PlayerTurnContext);

  useEffect(() => {
    if (status === 'restart' || status === 'new') {
      setGridState(GridStateController.getInitialState());
    }
  }, [status]);

  const handleOnClick = (column: number, row: number) => {
    if (status === 'inProgress') {
      const controller = new GridStateController(gridState);
      controller.applyChange({ columnNo: column, rowNo: row }, playerTurn);
      if (controller.isFinished) {
        setStatus(playerTurn === 1 ? 'wonP1' : 'wonP2');
      } else {
        toggleTurn();
      }
      setGridState(controller.GridState);
    }
  };

  const playerClass =
    playerTurn === 1
      ? style.grid_marker__player_1
      : style.grid_marker__player_2;
  const markerClasses = [style.grid_marker, playerClass].join(' ');

  const doRollingAnimation = (columnData: Array<GridItem>) => {
    const animating = columnData.find((item) => item === 'animatingP1');
    if (animating === undefined) {
      return null;
    }
    return <div className="animate" />;
  };

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
        {doRollingAnimation(columnData)}
      </div>
    ));

  return <div className={style.game__board__slots}>{buildGridState()}</div>;
};

export default GameBoardSlots;
