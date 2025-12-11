import type { JSX } from "react";
import { ModalActions, ModalContent, ModalSlotContainer, Button, ButtonsContainer } from "./Modal.styles";

interface ModalSlotProps {
    onClose?: () => void;
    onConfirm?: () => void;
    children: JSX.Element;
    showButtons?: boolean;
    contentRef?: React.RefObject<any>;
}

function Modal({ onClose, children, showButtons = true, onConfirm }: ModalSlotProps) {
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
            <ModalContent onKeyDown={handleKeyDown}>
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
    )
}
export default Modal;
