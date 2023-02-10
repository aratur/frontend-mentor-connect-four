import React from 'react';
import Button from '../Button';
import style from './ingame_modal.module.scss';

type Props = {
  showModal: boolean;
  onContinue: () => void;
  onQuit: () => void;
  onRestart: () => void;
};

const InGameModal = (props: Props) => {
  const { showModal, onContinue, onQuit, onRestart } = props;
  return showModal ? (
    <div className={style.modal}>
      <div className={style.modal__menu}>
        <h1 className="h1 heading_large fnt_white">Pause</h1>
        <div className={style.modal__buttons}>
          <Button buttonClass="white" onClick={onContinue}>
            <div className="h2 heading_medium text_align_center">
              Continue game
            </div>
          </Button>
          <Button buttonClass="white" onClick={onRestart}>
            <div className="h2 heading_medium text_align_center">Restart</div>
          </Button>
          <Button buttonClass="quit" onClick={onQuit} linkTo="/">
            <div className="h2 heading_medium text_align_center">Quit game</div>
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default InGameModal;
