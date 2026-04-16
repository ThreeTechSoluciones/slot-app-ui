import type { JSX } from 'react';
import {
  ButtonsContainer,
  ModalContainer,
  Background,
  TitleContainer,
  ContentContainer,
} from './Modal.styles';
import Button from '../button/Button';

export interface ModalProps {
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  children: JSX.Element;
  contentRef?: React.RefObject<any>;
  title?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

interface PrivateModalProps extends ModalProps {
  active: boolean;
}

function Modal({
  children,
  onClose,
  onConfirm,
  onCancel,
  title,
  active = false,
  primaryButtonText,
  secondaryButtonText,
}: PrivateModalProps) {
  if (!active) return;

  const showButtons = primaryButtonText || secondaryButtonText;

  console.log('Modal renderizado con props:');

  const handleConfirm = () => {
    console.log('Confirm button clicked');
    if (onConfirm) {
      console.log('Executing onConfirm callback');
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleConfirm();
    }

    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <Background onKeyDown={handleKeyDown}>
      <ModalContainer>
        {title && (
          <TitleContainer>
            <h2>{title}</h2>
          </TitleContainer>
        )}
        <ContentContainer>{children}</ContentContainer>
        {showButtons && (
          <ButtonsContainer>
            {secondaryButtonText && (
              <Button size="full" onClick={onCancel}>
                {secondaryButtonText}
              </Button>
            )}
            {primaryButtonText && (
              <Button size="full" onClick={handleConfirm}>
                {primaryButtonText}
              </Button>
            )}
          </ButtonsContainer>
        )}
      </ModalContainer>
    </Background>
  );
}

export default Modal;
