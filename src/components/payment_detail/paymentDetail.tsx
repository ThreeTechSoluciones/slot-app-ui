import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalContent,
  CloseButton,
} from "./paymentDetail.styles";
import CancelIcon from "../../assets/cancel-icon.svg";

interface PaymentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: {
    number: string;
    amount: number;
    date: string;
  } | null;
}

const PaymentDetailsModal: React.FC<PaymentDetailsModalProps> = ({
  isOpen,
  onClose,
  payment,
}) => {
  if (!isOpen || !payment) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>DETALLE DEL PAGO</ModalTitle>
          <CloseButton onClick={onClose}>
            <img src={CancelIcon} alt="Close" />
          </CloseButton>
          <strong>#Cuota N°{payment.number}</strong>
        </ModalHeader>

        <ModalContent>
          <strong>N° de pago:</strong>
          {payment.number}
          <strong>Monto:</strong> ${payment.amount}
          <strong>Fecha de pago:</strong> {payment.date}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PaymentDetailsModal;
