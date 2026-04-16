import type { JSX } from 'react';
import {
  ButtonsContainer,
  ModalContainer,
  Background,
  TitleContainer,
  ContentContainer,
  HeaderContainer,
  CloseButton,
} from './Modal.styles';
import Button from '../button/Button';
import CancelIcon from '../../assets/cancel-icon.svg';

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

  const handleConfirm = () => {
    if (onConfirm) {
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
        <HeaderContainer>
          {title && (
            <TitleContainer>
              <h2>{title}</h2>
            </TitleContainer>
          )}
          {onClose && (
            <CloseButton onClick={onClose}>
              <img src={CancelIcon} alt="Close" />
            </CloseButton>
          )}
        </HeaderContainer>
        <ContentContainer>{children}</ContentContainer>
        {showButtons && (
          <ButtonsContainer>
            {secondaryButtonText && (
              <Button fontsize="medium" size="full" onClick={onCancel}>
                {secondaryButtonText}
              </Button>
            )}
            {primaryButtonText && (
              <Button fontsize="medium" size="full" onClick={handleConfirm}>
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
