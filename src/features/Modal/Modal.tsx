import React from 'react';
import { Button } from '../../components';
import style from './modal.module.scss';

type Props = {
  showModal: boolean;
  onContinue: () => void;
  onQuit: () => void;
  onRestart: () => void;
};

const Modal = (props: Props) => {
  const { showModal, onContinue, onQuit, onRestart } = props;
  return showModal ? (
    <div data-testid="modal" className={style.modal}>
      <div className={style.modal__menu}>
        <h1 className="h1 heading-large fnt-white">Pause</h1>
        <div className={style.modal__buttons}>
          <Button variant="white" onClick={onContinue}>
            <div className="h2 heading-medium text-align-center">
              Continue game
            </div>
          </Button>
          <Button variant="white" onClick={onRestart}>
            <div className="h2 heading-medium text-align-center">Restart</div>
          </Button>
          <Button variant="quit" onClick={onQuit} linkTo="/">
            <div className="h2 heading-medium text-align-center">Quit game</div>
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
