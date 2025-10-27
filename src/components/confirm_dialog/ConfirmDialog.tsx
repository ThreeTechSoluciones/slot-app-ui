import Button from "../button/Button";
import {
  ConfirmOverlay,
  ConfirmBox,
  ConfirmActions,
  MessageStyle,
} from "./ConfirmDialog.styles";

type ConfirmDialogProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <ConfirmOverlay>
      <ConfirmBox>
        <MessageStyle>{message}</MessageStyle>
        <ConfirmActions>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button onClick={onConfirm}>Aceptar</Button>
        </ConfirmActions>
      </ConfirmBox>
    </ConfirmOverlay>
  );
}
