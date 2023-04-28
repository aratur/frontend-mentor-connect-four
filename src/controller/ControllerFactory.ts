import { GridState } from '../model/GridState';
import CPUController from './CPUController';
import GameControllerI from './GameControllerI';
import PvPController from './PvPController';

class ControllerFactory {
  private isCPU: boolean;

  constructor(isCPU: boolean) {
    this.isCPU = isCPU;
  }

  /**
   * getController
 : GameControllerI  */
  public getController(gridState: GridState | null): GameControllerI {
    return this.isCPU
      ? new CPUController(gridState)
      : new PvPController(gridState);
  }
}

export default ControllerFactory;
