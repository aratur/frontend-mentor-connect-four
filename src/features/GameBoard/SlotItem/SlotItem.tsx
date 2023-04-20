import React, { useContext } from 'react';
import { GridItem } from '../../../model/GridState';
import {
  GameStateContext,
  GameStateInContext,
} from '../../../context/GameStateContext';
import style from './slot-item.module.scss';

type Props = {
  gridItem: GridItem;
  columnIndex: number;
  rowIndex: number;
};

const SlotItem = (props: Props) => {
  const { gridItem, rowIndex, columnIndex } = props;
  const { move } = useContext<GameStateInContext>(GameStateContext);
  return (
    <button
      type="button"
      onClick={() => move(columnIndex, rowIndex)}
      disabled={gridItem !== 'isEmpty'}
      data-item={gridItem}
      className={style['item-slot']}
    >
      <span className="sr-only">
        {columnIndex}-{rowIndex}
      </span>
    </button>
  );
};

export default SlotItem;
