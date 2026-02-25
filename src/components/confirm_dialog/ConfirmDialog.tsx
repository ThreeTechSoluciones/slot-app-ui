import Button from '../button/Button';
import {
  ConfirmOverlay,
  ConfirmBox,
  ConfirmActions,
  MessageStyle,
  QuestionStyle,
  InfoBox,
} from './ConfirmDialog.styles';
import QuestionMarkIcon from '../../assets/question-mark-icon.svg';

type ConfirmDialogProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <ConfirmOverlay>
      <ConfirmBox>
        <InfoBox>
          <QuestionStyle>
            <img src={QuestionMarkIcon} alt="question-mark-icon" />
          </QuestionStyle>
          <MessageStyle>{message}</MessageStyle>
        </InfoBox>

        <ConfirmActions>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button onClick={onConfirm}>Aceptar</Button>
        </ConfirmActions>
      </ConfirmBox>
    </ConfirmOverlay>
  );
}
