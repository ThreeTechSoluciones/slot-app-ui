import styled from "styled-components";
import {
  ERROR_COLOR,
  PRIMARY_COLOR,
  SUCCESS_COLOR,
  TERTIARY_COLOR,
  BORDER_RADIUS,
  FONT_FAMILY,
  TEXT_COLOR,
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
export const IconStyles = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;
export const SubTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-left: 5rem;
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
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;
export const ViewIconStyle = styled.img`
  margin-left: 4px;
`;

export const FeeStatusContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const FeeStatus = styled.div<{
  $status: string;
}>`
  background-color: ${({ $status }) => {
    switch ($status) {
      case "Pendiente":
        return PRIMARY_COLOR;
      case "Vencida":
        return ERROR_COLOR;
      case "Pagada":
        return SUCCESS_COLOR;
      case "Pagado vencido":
        return TERTIARY_COLOR;
      default:
        return TERTIARY_COLOR;
    }
  }};
  border-radius: ${BORDER_RADIUS};
  font-family: ${FONT_FAMILY};
  color: ${TEXT_COLOR};
  width: 136px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
