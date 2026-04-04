import React, { useRef, useEffect } from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  IconWrapper,
  StyledIcon,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from './GenericModal.styles';
import Button from '../button/Button';

type GenericModalProps = {
  isOpen?: boolean;
  icon?: string;
  iconSize?: string;
  isConfirmModal?: boolean;
  title: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'warning' | 'success';
  width?: string;
  height?: string;
};

export const GenericModal: React.FC<GenericModalProps> = ({
  isOpen = true,
  icon,
  iconSize,
  isConfirmModal,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = 'Registrar',
  cancelText = 'Cancelar',
  confirmVariant = 'primary',
  width = '480px',
  height = '550px',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const input = containerRef.current?.querySelector('input');
    if (input) {
      input.focus();
    } else {
      containerRef.current?.focus();
    }
  }, []);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer
        ref={containerRef}
        $width={width}
        $height={height}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onConfirm?.();
          }
        }}
      >
        <ModalHeader>
          {icon && (
            <IconWrapper $size={iconSize}>
              <StyledIcon src={icon} alt="modal-icon" $size={iconSize} />
            </IconWrapper>
          )}
          <ModalTitle $isConfirmModal={isConfirmModal}>{title}</ModalTitle>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variant="primary" fontsize="medium" onClick={onCancel}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button variant={confirmVariant} fontsize="medium" onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};
