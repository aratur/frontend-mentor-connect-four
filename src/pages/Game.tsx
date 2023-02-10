import React, { useCallback, useContext, useEffect, useState } from 'react';

import style from './game.module.scss';
import InGameModal from '../components/InGameModal/InGameModal';
import PlayerScore from '../components/PlayerScore/PlayerScore';
import GameHeader from '../components/GameHeader/GameHeader';
import GameFooter from '../components/GameFooter/GameFooter';
import GameBoardWhite from '../components/GameBoardWhite/GameBoardWhite';
import GameBoardBlack from '../components/GameBoardBlack/GameBoardBlack';
import GameBoardSlots from '../components/GameBoardSlots/GameBoardSlots';
import { PlayerTurnContext } from '../context/PlayerTurnContext';

const Game = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { status, setStatus, toggleTurn } = useContext(PlayerTurnContext);
  const [isPaused, setIsPaused] = useState(false);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const resetToInitialState = useCallback(() => {
    setIsPaused(false);
    toggleTurn();
    setStatus('inProgress');
  }, [setStatus, toggleTurn, setIsPaused]);

  useEffect(() => {
    switch (status) {
      case 'restart':
        setPlayer1Score(0);
        setPlayer2Score(0);
        resetToInitialState();
        break;
      case 'wonP1':
        !isPaused && setPlayer1Score(player1Score + 1);
        setIsPaused(true);
        break;
      case 'wonP2':
        !isPaused && setPlayer2Score(player2Score + 1);
        setIsPaused(true);
        break;
      case 'draw':
        setIsPaused(true);
        break;
      case 'new':
        resetToInitialState();
        break;
      case 'inProgress':
        // do nothing;
        break;
      default:
        throw Error('not implemented');
        break;
    }
  }, [status, resetToInitialState, player2Score, player1Score, isPaused]);

  // -----------
  // Header handlers
  const handleMenuClicked = () => {
    setIsPaused(true);
    setShowModal(!showModal);
  };

  const handleRestartClicked = () => {
    setStatus('restart');
  };

  // -----------
  // Modal handlers
  const handleModalContinue = () => {
    if (status === 'inProgress') setIsPaused(false);
    setShowModal(!showModal);
  };

  const handleModalRestart = () => {
    setStatus('restart');
    setShowModal(!showModal);
  };

  const handleModalQuit = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="page">
      <div className={style.game}>
        <GameHeader
          onMenuClick={handleMenuClicked}
          onRestartClicked={handleRestartClicked}
        />
        <main className={style.game__main}>
          <PlayerScore player={1} points={player1Score} />
          <PlayerScore player={2} points={player2Score} />
          <div className={style.game__board}>
            <GameBoardWhite />
            <GameBoardBlack />
            <GameBoardSlots />
          </div>
        </main>
        <GameFooter isPaused={isPaused} />
      </div>
      <InGameModal
        showModal={showModal}
        onContinue={handleModalContinue}
        onRestart={handleModalRestart}
        onQuit={handleModalQuit}
      />
    </div>
  );
};

export default Game;
