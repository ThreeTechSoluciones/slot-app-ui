import styled from 'styled-components';
import {
  BORDER_RADIUS,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  NEUTRAL_COLOR,
  SMALL_FONT_SIZE,
} from '../../../utils/Stylesheet';
import { DEFAULT_FONT_SIZE } from '../../../utils/Stylesheet';

export const NextPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
`;

export const NextPriceData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`;

export const Price = styled.span`
  font-size: ${DEFAULT_FONT_SIZE};
  color: ${DEFAULT_TEXT_COLOR};
`;

export const Date = styled.span`
  font-size: ${SMALL_FONT_SIZE};
  color: ${NEUTRAL_COLOR};
  font-weight: ${FONT_WEIGHT_BOLD};
`;

export const ShowFuturePricesButton = styled.button`
  margin-left: auto;
  flex-shrink: 0;
  display: flex;
  
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  border-radius: ${BORDER_RADIUS};
  border: none;
  width: 50px;
  height: 30px;
  color: ${DEFAULT_TEXT_COLOR};
  font-size: ${DEFAULT_FONT_SIZE};
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    transform 0.1s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

export const NextPriceSpacer = styled.div`
  width: 40px;
`;
