import styled from 'styled-components';
import {
  DANGER_COLOR,
  SUCCESS_COLOR,
  NEUTRAL_COLOR,
  BORDER_RADIUS,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_NORMAL,
  WARNING_COLOR,
  BACKGROUND_COLOR,
  LARGE_FONT_SIZE,
  DEFAULT_FONT_SIZE,
} from '../../utils/Stylesheet';

export const InformationStudent = styled.div``;
export const StudentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
  min-height: calc(100vh - 80px);
`;

export const TitleContainer = styled.div`
  display: flex;
  margin-left: 76px;
  gap: 24px;
  align-items: center;
  margin-top: 32px;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: ${LARGE_FONT_SIZE};
  justify-content: flex-start;
  width: 100%;
  color: ${DEFAULT_TEXT_COLOR};
`;

interface SubtitleProps {
  $isBold?: boolean;
}

export const SubTitle = styled.h2<SubtitleProps>`
  display: flex;
  align-items: center;
  color: ${DEFAULT_TEXT_COLOR};
  font-size: ${DEFAULT_FONT_SIZE};
  margin-left: 5rem;
  font-weight: ${(props) => (props.$isBold ? FONT_WEIGHT_BOLD : FONT_WEIGHT_NORMAL)};
  img {
    padding-right: 6px;
  }
`;

export const MetricsContainer = styled.div`
  padding-left: 80px;
  margin-bottom: 20px;
`;

export const FiltersContainer = styled.div`
  display: flex;
  margin: 20px 80px;
`;

export const LeftContainer = styled.div`
  display: flex;
  gap: 26px;
`;

export const RightContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
`;

export const ActionButton = styled.button`
  color: ${DEFAULT_TEXT_COLOR};
  border: none;
  background: none;
  font-size: ${DEFAULT_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
  text-decoration: underline;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const BaseIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const ViewIconStyle = styled(BaseIcon)``;

export const CoinIconStyles = styled(BaseIcon)``;

export const FeeStatusContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const STATUS_COLORS: { [key: string]: string } = {
  Pendiente: WARNING_COLOR,
  Vencido: DANGER_COLOR,
  Pagado: SUCCESS_COLOR,
  'Pago con atraso': NEUTRAL_COLOR,
};

export const FeeStatus = styled.div<{
  $status: string;
}>`
  background-color: ${({ $status }) => {
    return STATUS_COLORS[$status] || NEUTRAL_COLOR;
  }};
  border-radius: ${BORDER_RADIUS};
  color: ${BACKGROUND_COLOR};
  font-weight: ${FONT_WEIGHT_BOLD};
  width: 136px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${DEFAULT_FONT_SIZE};
`;

export const DatePickerWrapper = styled.div``;
export const ContentContainer = styled.div`
  flex: 1;
`;
export const PaginationContainer = styled.div`
  margin-top: auto;
  padding: 35px 0px 35px 0px;
`;
