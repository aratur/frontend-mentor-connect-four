import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import style from './game.module.scss';
import { Footer, Header, Score, Modal } from '../features';

import { GameStateContext } from '../context/GameStateContext';
import GameBoard from '../features/GameBoard/GameBoard';

const Game = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { status, setStatus, toggleTurn } = useContext(GameStateContext);
  const [isPaused, setIsPaused] = useState(false);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const location = useLocation();
  const isCPU = location.pathname === '/game/cpu';

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
  const handleMenuClicked = useCallback(() => {
    setIsPaused(true);
    setShowModal(!showModal);
  }, [showModal]);

  const handleRestartClicked = useCallback(() => {
    setStatus('restart');
  }, [setStatus]);

  // -----------
  // Modal handlers
  const handleModalContinue = useCallback(() => {
    if (status === 'inProgress') setIsPaused(false);
    setShowModal(!showModal);
  }, [showModal, status]);

  const handleModalRestart = useCallback(() => {
    setStatus('restart');
    setShowModal(!showModal);
  }, [setStatus, showModal]);

  const handleModalQuit = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  return (
    <div className="page">
      <div className={style.game}>
        <Header
          onMenuClick={handleMenuClicked}
          onRestartClicked={handleRestartClicked}
        />
        <main className={style.game__main}>
          <h1 className="sr-only">Game 4 in a row</h1>
          <Score player={1} points={player1Score} isCPU={isCPU} />
          <Score player={2} points={player2Score} isCPU={isCPU} />
          <GameBoard />
        </main>
        <Footer isPaused={isPaused} />
      </div>
      <Modal
        showModal={showModal}
        onContinue={handleModalContinue}
        onRestart={handleModalRestart}
        onQuit={handleModalQuit}
      />
    </div>
  );
};

export default Game;
