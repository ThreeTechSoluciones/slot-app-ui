import React, { useEffect } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "./GenericModal.styles";
import Button from "../button/Button";

type GenericModalProps = {
  isOpen?: boolean;
  title: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "warning" | "success";
  width?: string;
  height?: string;
};

export const GenericModal: React.FC<GenericModalProps> = ({
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = "Registrar",
  cancelText = "Cancelar",
  confirmVariant = "primary",
  width = "480px",
  height = "550px",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if ((e.target as HTMLElement).tagName === "BUTTON") return;
        e.preventDefault();
        onConfirm?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onConfirm, cancelText]);

  return (
    <ModalOverlay>
      <ModalContainer $width={width} $height={height}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>

        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button variant="primary" size="medium" onClick={onCancel}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button variant={confirmVariant} size="medium" onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};
