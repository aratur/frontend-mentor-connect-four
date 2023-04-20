/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';
import style from './slots.module.scss';
import { GridState } from '../../../model/GridState';
import GridStateController from '../../../controller/GridStateController';
import {
  GameStateInContext,
  GameStateContext,
} from '../../../context/GameStateContext';
import SlotColumn from '../SlotColumn.tsx/SlotColumn';

const GameBoardSlots = () => {
  const [gridState, setGridState] = useState<GridState>(
    GridStateController.getInitialState()
  );
  const { isCPU, playerTurn, status, move } =
    useContext<GameStateInContext>(GameStateContext);

  useEffect(() => {
    if (status === 'restart' || status === 'new') {
      setGridState(GridStateController.getInitialState());
    }
  }, [status]);

  useEffect(() => {
    if (isCPU && playerTurn === 2) {
      const handle = setTimeout(() => move(0, 0), 2000);
      return () => clearTimeout(handle);
    }
    return () => {};
  }, [move, isCPU, playerTurn]);

  const buildGridState = () =>
    gridState.map((columnData, columnIndex) => (
      <SlotColumn
        columnIndex={columnIndex}
        data={columnData}
        key={columnIndex}
      />
    ));

  return <div className={style.slots}>{buildGridState()}</div>;
};

export default GameBoardSlots;
