import { GameStateContextI } from './GameStateContextI';

const defaultGameState: GameStateContextI = {
  playerTurn: 1,
  isCPU: false,
  status: 'new',
  toggleTurn: () => {
    throw new Error('missing implementation');
  },
  setStatus: () => {
    throw new Error('missing implementation');
  },
  setIsCPU: () => {
    throw new Error('missing implementation');
  },
  move: () => {
    throw new Error('missing implementation');
  },
  getValueAt: () => {
    throw new Error('missing implementation');
  },
};

export default defaultGameState;
