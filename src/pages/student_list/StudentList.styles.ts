import styled from "styled-components";
import {
  BACKGROUND_COLOR,
  BORDER_RADIUS,
  DANGER_COLOR,
  SUCCESS_COLOR,
  NEUTRAL_COLOR,
  FONT_FAMILY,
  FONT_WEIGHT_BOLD,
} from "../../utils/Stylesheet";
export const StudentsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;
export const Title = styled.h1`
  font-size: 24px;
  margin-left: 80px;
  font-family: ${FONT_FAMILY};
  font-weight: ${FONT_WEIGHT_BOLD};
  margin-top: 56px;
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
  flex-wrap: wrap;
`;

const CommonStatusAndSituation = styled.p`
  color: ${BACKGROUND_COLOR};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 136px;
  height: 32px;
  margin: 0 auto;
  font-size: 16px;
  border-radius: ${BORDER_RADIUS};
  font-weight: 700;
`;

export const SituationText = styled(CommonStatusAndSituation) <{
  $status: string;
}>`
  background-color: ${({ $status }) =>
    $status === "En término" ? `${SUCCESS_COLOR}` : `${DANGER_COLOR}`};
`;

export const StatusText = styled(CommonStatusAndSituation) <{
  $isActive: boolean;
}>`
  background-color: ${({ $isActive }) =>
    $isActive ? `${SUCCESS_COLOR}` : `${NEUTRAL_COLOR}`};
`;
