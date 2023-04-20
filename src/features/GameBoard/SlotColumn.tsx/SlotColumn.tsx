import React, { useContext } from 'react';
import { GridItem } from '../../../model/GridState';
import {
  GameStateContext,
  GameStateInContext,
} from '../../../context/GameStateContext';
import style from './slot-column.module.scss';
import SlotItem from '../SlotItem/SlotItem';

type Props = {
  data: GridItem[];
  columnIndex: number;
};

const SlotColumn = (props: Props) => {
  const { data, columnIndex } = props;
  const { playerTurn } = useContext<GameStateInContext>(GameStateContext);

  const playerClass =
    playerTurn === 1
      ? style['slot-column__player-1']
      : style['slot-column__player-2'];
  const markerClasses = [style['slot-column__marker'], playerClass].join(' ');

  return (
    <div key={`${columnIndex + 1}`} className={style['slot-column']}>
      {data.map((gridItem, rowIndex) => (
        <SlotItem
          gridItem={gridItem}
          columnIndex={columnIndex}
          rowIndex={rowIndex}
          key={`${columnIndex + 1}_${rowIndex + 1}`}
        />
      ))}
      <div className={markerClasses} />
    </div>
  );
};

export default SlotColumn;
