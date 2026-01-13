import styled from "styled-components";
import {
  DANGER_COLOR,
  SUCCESS_COLOR,
  NEUTRAL_COLOR,
  BORDER_RADIUS,
  FONT_FAMILY,
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_NORMAL,
  WARNING_COLOR,
} from "../../utils/Stylesheet";

export const InformationStudent = styled.div``;
export const StudentsContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  min-height: 100vh;
`;

export const TitleContainer = styled.div`
  display: flex;
  margin-left: 76px;
  gap: 24px;
`;
export const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 24px;
  justify-content: flex-start;
  width: 100%;
`;
interface SubtitleProps {
  $isBold?: boolean;
}
export const SubTitle = styled.h2<SubtitleProps>`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-left: 5rem;
  font-family: ${FONT_FAMILY};
  font-weight: ${(props) =>
    props.$isBold ? FONT_WEIGHT_BOLD : FONT_WEIGHT_NORMAL};
  img {
    padding-right: 6px;
  }
`;
export const FiltersContainer = styled.div`
  display: flex;
  margin: 0px 80px;
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
  color: black;
  border: none;
  background: none;
  font-size: 16px;
  font-family: ${FONT_FAMILY};
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
  "Pago con atraso": NEUTRAL_COLOR
};

export const FeeStatus = styled.div<{
  $status: string;
}>`
  background-color: ${({ $status }) => { return STATUS_COLORS[$status] || NEUTRAL_COLOR }};
  border-radius: ${BORDER_RADIUS};
  font-family: ${FONT_FAMILY};
  color: ${DEFAULT_TEXT_COLOR};
  width: 136px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;
export const DatePickerWrapper = styled.div``;
