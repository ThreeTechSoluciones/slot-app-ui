import styled from "styled-components";
import { ERROR_COLOR, FONT_FAMILY } from "../../utils/Stylesheet";

export const ErrorText = styled.p`
  color: ${ERROR_COLOR};
  font-family: ${FONT_FAMILY};
  font-size: 12px;
  padding: 3px 0 0 0;
  display: flex;
  align-items: center;
  margin: 3px 0px 0px 0px;
  gap: 6px;
`;
