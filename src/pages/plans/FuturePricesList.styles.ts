import styled from 'styled-components';
import {
  BORDER_RADIUS,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_NORMAL,
  MEDIUM_FONT_SIZE,
  NEUTRAL_COLOR,
  WARNING_COLOR,
} from '../../utils/Stylesheet';

export const FuturePricesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 400px;
`;

interface FuturePriceItemProps {
  $isLast?: boolean;
  $isOnlyOne?: boolean;
}

export const FuturePriceItem = styled.div<FuturePriceItemProps>`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: ${(props) => (props.$isLast ? 'none' : `1.5px solid ${DEFAULT_TEXT_COLOR}`)};
  height: ${(props) => (props.$isOnlyOne ? '80px' : `50px`)};
  width: 380px;
`;

export const Title = styled.p`
  font-size: ${DEFAULT_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
  color: ${DEFAULT_TEXT_COLOR};
  padding: 0px;
  margin: 0px;
`;

export const Subtitle = styled.p`
  font-size: ${MEDIUM_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
  color: ${NEUTRAL_COLOR};
  padding: 0px;
  margin: 0px 0px 16px 0px;
`;

export const PriceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
`;

export const Price = styled.div`
  font-size: ${DEFAULT_FONT_SIZE};
  color: ${DEFAULT_TEXT_COLOR};
  font-weight: ${FONT_WEIGHT_NORMAL};
  margin: 0px;
  padding: 0px;
`;

export const StartDate = styled.div`
  font-size: ${MEDIUM_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
  color: ${NEUTRAL_COLOR};
  margin: 0px;
  padding: 0px;
`;

export const DaysUntilActiveComp = styled.div<{ $variant: 'next' | 'future' }>`
  font-size: ${MEDIUM_FONT_SIZE};
  width: 100px;
  height: 24px;
  border-radius: ${BORDER_RADIUS};
  border: 2px solid ${WARNING_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${FONT_WEIGHT_BOLD};
  ${({ $variant }) =>
    $variant === 'next' &&
    `
    color: white;
    background-color: ${WARNING_COLOR};
  `}

  ${({ $variant }) =>
    $variant === 'future' &&
    `
    color: ${WARNING_COLOR};
    background-color: white;
  `}
`;

export const FuturePricesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
  overflow-y: auto;
  max-height: 240px;
  padding-right: 12px;
`;
