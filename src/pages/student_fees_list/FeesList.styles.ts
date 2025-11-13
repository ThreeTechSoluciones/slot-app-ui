import styled from "styled-components";
import {
  ERROR_COLOR,
  PRIMARY_COLOR,
  SUCCESS_COLOR,
  TERTIARY_COLOR,
} from "../../utils/Stylesheet";
export const StudentsContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  min-height: 100vh;
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

export const FeeStatus = styled.div<{
  $status: string;
}>`
  background-color: ${({ $status }) => {
    switch ($status) {
      case "pendiente":
        return PRIMARY_COLOR;
      case "vencida":
        return ERROR_COLOR;
      case "pagada":
        return SUCCESS_COLOR;
      case "pagado vencido":
        return TERTIARY_COLOR;
      default:
        return TERTIARY_COLOR;
    }
  }};
`;
