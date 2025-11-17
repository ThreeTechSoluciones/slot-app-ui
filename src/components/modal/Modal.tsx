import type { JSX } from "react";
import { ModalActions, ModalContent, ModalSlotContainer, Button, ButtonsContainer } from "./Modal.styles";

interface ModalSlotProps {
    onClose?: () => void;
    // onConfirm?: () => void;
    content: JSX.Element;
    showButtons?: boolean;
}

function Modal({ onClose, content, showButtons }: ModalSlotProps) {
    return (
        <ModalSlotContainer>
            <ModalContent>
                {content}
                {showButtons && (
                    <ModalActions>
                        <ButtonsContainer>
                            <Button onClick={onClose}>Cancelar</Button>
                            <Button>Guardar</Button>
                        </ButtonsContainer>
                    </ModalActions>
                )}
            </ModalContent>
        </ModalSlotContainer>
    )
}
export default Modal;
