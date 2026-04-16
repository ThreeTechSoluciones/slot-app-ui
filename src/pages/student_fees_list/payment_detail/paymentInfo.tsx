import React from 'react';
import {
  ModalOverlay,
  ModalContainer,
  TextColumn,
  FieldLabel,
  Value,
  ModalContent,
  ModalRow,
  IconCircle,
  MonthlyFeeText,
} from './paymentInfo.styles';
import HashtagIcon from '../../../assets/hashtag-icon.svg';
import PesoIcon from '../../../assets/peso-icon.svg';
import CalendarIcon from '../../../assets/calendar-icon.svg';
import { formatCurrency } from '../../../utils/Formatter';
import { useGetPaymentInfoQuery } from '../../../app/services/PaymentService';
import { skipToken } from '@reduxjs/toolkit/query';

interface PaymentInfoModalProps {
  paymentId: string | null;
}

const PaymentInfoModal: React.FC<PaymentInfoModalProps> = ({ paymentId }) => {
  const { data: payment, isLoading, isError } = useGetPaymentInfoQuery(paymentId ?? skipToken);
  if (!paymentId) return null;
  
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
          <div>Error al cargar la información del pago</div>
        </ModalContainer>
      </ModalOverlay>
    );
  }

  return (
    <ModalContainer>
      <MonthlyFeeText>{`#Cuota N°${payment.monthlyFeeNumber}`}</MonthlyFeeText>
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
  );
};

export default PaymentInfoModal;
