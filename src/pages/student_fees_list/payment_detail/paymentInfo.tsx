import React from 'react';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  FeeTitle,
  TextColumn,
  FieldLabel,
  Value,
  ModalContent,
  ModalRow,
  CloseButton,
  IconCircle,
} from './paymentInfo.styles';
import CancelIcon from '../../../assets/cancel-icon.svg';
import HashtagIcon from '../../../assets/hashtag-icon.svg';
import PesoIcon from '../../../assets/peso-icon.svg';
import CalendarIcon from '../../../assets/calendar-icon.svg';
import { formatCurrency } from '../../../utils/Formatter';
import { useGetPaymentInfoQuery } from '../../../app/services/PaymentService';
import { skipToken } from '@reduxjs/toolkit/query';

interface PaymentInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string | null;
}

const PaymentInfoModal: React.FC<PaymentInfoModalProps> = ({ isOpen, onClose, paymentId }) => {
  const { data: payment, isLoading, isError } = useGetPaymentInfoQuery(paymentId ?? skipToken);
  if (!isOpen || !paymentId) return null;
  if (isLoading) {
    return (
      <ModalOverlay>
        <ModalContainer>
          <div>Cargando información del pago...</div>
        </ModalContainer>
      </ModalOverlay>
    );
  }
  if (isError || !payment) {
    return (
      <ModalOverlay>
        <ModalContainer>
          <CloseButton onClick={onClose}>
            <img src={CancelIcon} alt="Close" />
          </CloseButton>
          <div>Error al cargar la información del pago</div>
        </ModalContainer>
      </ModalOverlay>
    );
  }
  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <img src={CancelIcon} alt="Close" />
        </CloseButton>
        <ModalHeader>
          <ModalTitle>DETALLE DEL PAGO</ModalTitle>
        </ModalHeader>

        <FeeTitle>#Cuota N°{payment.monthlyFeeNumber}</FeeTitle>

        <ModalContent>
          <ModalRow>
            <IconCircle>
              <img src={HashtagIcon} alt="Número de pago" width={16} height={16} />
            </IconCircle>
            <TextColumn>
              <FieldLabel>N° de pago </FieldLabel>
              <Value>{payment.paymentNumber}</Value>
            </TextColumn>
          </ModalRow>
          <ModalRow>
            <IconCircle>
              <img src={PesoIcon} alt="Signo Pesos" width={11} height={19} />
            </IconCircle>

            <TextColumn>
              <FieldLabel>Monto </FieldLabel>
              <Value>{formatCurrency(payment.amount)}</Value>
            </TextColumn>
          </ModalRow>
          <ModalRow>
            <IconCircle>
              <img src={CalendarIcon} alt="Calendario" width={16} height={16} />
            </IconCircle>

            <TextColumn>
              <FieldLabel>Fecha de pago</FieldLabel>
              <Value> {payment.paymentDate}</Value>
            </TextColumn>
          </ModalRow>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PaymentInfoModal;
