/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import style from './slots.module.scss';
import { COLS } from '../../../controller/constants';
import SlotColumn from '../SlotColumn.tsx/SlotColumn';

const GameBoardSlots = () => {
  const columns = useMemo(
    () =>
      [...Array(COLS)].map((_, columnIndex) => (
        <SlotColumn columnIndex={columnIndex} key={columnIndex} />
      )),
    []
  );

  return <div className={style.slots}>{columns}</div>;
};

export default GameBoardSlots;
