import React, { useContext, useMemo } from 'react';
import {
  GameStateContext,
  GameStateInContext,
} from '../../../context/GameStateContext';
import style from './slot-column.module.scss';
import SlotItem from '../SlotItem/SlotItem';
import { ROWS } from '../../../controller/GridStateController';

type Props = {
  columnIndex: number;
};

const SlotColumn = (props: Props) => {
  const { columnIndex } = props;
  const { playerTurn } = useContext<GameStateInContext>(GameStateContext);

  const playerClass =
    playerTurn === 1
      ? style['slot-column__player-1']
      : style['slot-column__player-2'];
  const markerClasses = [style['slot-column__marker'], playerClass].join(' ');

  const rows = useMemo(
    () =>
      [...Array(ROWS)].map((_, rowIndex) => (
        <SlotItem
          columnNo={columnIndex}
          rowNo={rowIndex}
          key={`${columnIndex + 1}_${rowIndex + 1}`}
        />
      )),
    [columnIndex]
  );

  return (
    <div key={`${columnIndex + 1}`} className={style['slot-column']}>
      {rows}
      <div className={markerClasses} />
    </div>
  );
};

export default SlotColumn;
