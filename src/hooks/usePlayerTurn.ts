import { useContext, useEffect, useState } from 'react';
import { GameStateContext } from '../store/GameStateContext';

const usePlayerTurn = (countdown: number, resetCountDown: () => void) => {
  const [copyPlayerTurn, setCopyPlayerTurn] = useState(0);
  const { playerTurn, status, isCPU, setStatus } = useContext(GameStateContext);
  useEffect(() => {
    if (copyPlayerTurn !== playerTurn) {
      // reset countdown on playerTurn change
      resetCountDown();
      setCopyPlayerTurn(playerTurn);
    }
  }, [playerTurn, copyPlayerTurn, resetCountDown]);

  useEffect(() => {
    if (countdown === 0 && !['wonP2', 'wonP1'].includes(status)) {
      setStatus(playerTurn === 1 ? 'wonP2' : 'wonP1');
      resetCountDown();
    }
  }, [countdown, playerTurn, resetCountDown, setStatus, status]);

  let label = `Player ${playerTurn}'s turn`;
  if (isCPU) label = playerTurn === 1 ? 'Your turn' : "cpu's turn";

  return [label, status, playerTurn];
};

export default usePlayerTurn;
