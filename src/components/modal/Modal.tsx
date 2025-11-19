import type { JSX } from "react";
import { ModalActions, ModalContent, ModalSlotContainer, Button, ButtonsContainer } from "./Modal.styles";

interface ModalSlotProps {
    onClose?: () => void;
    onConfirm?: () => void;
    content: JSX.Element;
    showButtons?: boolean;
    contentRef?: React.RefObject<any>;
}

function Modal({ onClose, content, showButtons, onConfirm, contentRef }: ModalSlotProps) {
    const handleConfirm = () => {
        // Si hay una ref, intentar llamar al submitForm
        if (contentRef?.current?.submitForm) {
            contentRef.current.submitForm();
        }
        // También llamar al onConfirm si existe
        if (onConfirm) {
            onConfirm();
        }
    };

    return (
        <ModalSlotContainer>
            <ModalContent>
                {content}
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
