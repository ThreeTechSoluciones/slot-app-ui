import styled from 'styled-components';
import {
  LIGHT_NEUTRAL_COLOR,
  FONT_WEIGHT_BOLD,
  LARGE_FONT_SIZE,
  DEFAULT_FONT_SIZE,
} from '../../../utils/Stylesheet';

export const PaymentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalTitle = styled.h2`
  font-size: ${LARGE_FONT_SIZE};
  margin: 0;
  text-align: center;
  font-weight: ${FONT_WEIGHT_BOLD};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`;

export const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
`;

export const FeeTitle = styled.h3`
  font-size: ${DEFAULT_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
  margin: 0 0 56px 0;
  text-align: center;
`;

export const FieldLabel = styled.span`
  font-size: ${DEFAULT_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
  line-height: 1.2;
  margin: 0;
`;

export const Value = styled.p`
  font-size: ${DEFAULT_FONT_SIZE};
  line-height: 1.2;
  margin: 0;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const MonthlyFeeText = styled.h3`
  align-self: center;
  font-size: ${DEFAULT_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
`;

export const ModalRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const IconCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
`;
