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

  const slotClassNames = (item: GridItem) => {
    const classNames = [style.grid__item_slot];
    switch (item) {
      case 'isEmpty':
        // do nothing
        break;
      case 'player1':
        classNames.push(style.grid__item_slot__player1);
        break;
      case 'player2':
        classNames.push(style.grid__item_slot__player2);
        break;
      case 'winnerP1':
        classNames.push(style.grid__item_slot__player1);
        classNames.push(style.grid__item_slot__winner);
        break;
      case 'winnerP2':
        classNames.push(style.grid__item_slot__player2);
        classNames.push(style.grid__item_slot__winner);
        break;
      case 'animatingP1':
        // TODO: animate P1
        break;
      case 'animatingP2':
        // TODO: animate P2
        break;
      default:
        throw Error('Not implemented');
    }
    return classNames.join(' ');
  };

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
            className={slotClassNames(gridItem)}
          >
            {/* {columnIndex}-{rowIndex} */}
          </button>
        ))}
        <div className={markerClasses} />
        {doRollingAnimation(columnData)}
      </div>
    ));

  return <div className={style.game__board__slots}>{buildGridState()}</div>;
};

export default GameBoardSlots;
