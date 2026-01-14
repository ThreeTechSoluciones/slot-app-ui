import styled from "styled-components";
import { SECONDARY_COLOR, TERTIARY_COLOR } from "../Stylesheet";
import { InputStyle } from "../../pages/plans/CreatePlanForm/CreatePlanForm.styles";
type PriceInputProps = {
  width: string;
};

export const PriceInput = styled(InputStyle)<PriceInputProps>`
  width: ${(props) => props.width}px;
  max-width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  &::placeholder {
    color: ${TERTIARY_COLOR};
  }
  background: ${(props) => (props.disabled ? SECONDARY_COLOR : "none")};
  border: ${(props) => (props.disabled ? SECONDARY_COLOR : "1px solid black")};
  &::placeholder {
    color: ${(props) => (props.disabled ? SECONDARY_COLOR : TERTIARY_COLOR)};
  }
`;
