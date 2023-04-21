import React, { useContext } from 'react';
import {
  GameStateContext,
  GameStateInContext,
} from '../../../context/GameStateContext';
import style from './slot-item.module.scss';

type Props = {
  columnNo: number;
  rowNo: number;
};

const SlotItem = (props: Props) => {
  const { rowNo, columnNo } = props;
  const { move, getValueAt } = useContext<GameStateInContext>(GameStateContext);
  const gridItem1 = getValueAt({ columnNo, rowNo });

  const gridItem = gridItem1 || 'isEmpty';

  return (
    <button
      type="button"
      onClick={() => move(columnNo, rowNo)}
      disabled={gridItem !== 'isEmpty'}
      data-item={gridItem}
      className={style['item-slot']}
    >
      <span className="sr-only">
        {columnNo}-{rowNo}
      </span>
    </button>
  );
};

export default SlotItem;
