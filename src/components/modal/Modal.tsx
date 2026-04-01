import { useRef, useEffect, type JSX } from 'react';
import {
  ModalSlotContainer,
  ModalContent,
  ModalActions,
  Button,
  ButtonsContainer,
} from './Modal.styles';

interface ModalSlotProps {
  onClose?: () => void;
  onConfirm?: () => void;
  children: JSX.Element;
  showButtons?: boolean;
  contentRef?: React.RefObject<any>;
}

function Modal({ onClose, children, showButtons = true, onConfirm }: ModalSlotProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.focus();
  }, []);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleConfirm();
    }
  };

  return (
    <ModalSlotContainer>
      <ModalContent ref={contentRef} tabIndex={0} onKeyDown={handleKeyDown}>
        {children}
        {showButtons && (
          <ModalActions>
            <ButtonsContainer>
              <Button onClick={onClose}>Cancelar</Button>
              <Button onClick={handleConfirm}>Guardar</Button>
            </ButtonsContainer>
          </ModalActions>
        )}
      </ModalContent>
    </ModalSlotContainer>
  );
}

export default Modal;
