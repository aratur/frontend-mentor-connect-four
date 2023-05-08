import React, { useContext } from 'react';
import { GameStateContext } from '../../../store/GameStateContext';
import { GameStateContextI } from '../../../store/GameStateContextI';
import style from './slot-item.module.scss';

type Props = {
  columnNo: number;
  rowNo: number;
};

const SlotItem = (props: Props) => {
  const { rowNo, columnNo } = props;
  const { move, getValueAt } = useContext<GameStateContextI>(GameStateContext);
  const gridItem1 = getValueAt({ columnNo, rowNo });

  const gridItem = gridItem1 || 'isEmpty';
  // console.log(gridItem, gridItem !== 'isEmpty');

  return (
    <button
      type="button"
      data-testid={`slot_${columnNo}-${rowNo}`}
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
