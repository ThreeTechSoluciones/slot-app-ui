import { Link } from "react-router";
import styled from "styled-components";
import {
  DEFAULT_TEXT_COLOR,
  FONT_WEIGHT_BOLD,
  DEFAULT_FONT_SIZE,
} from "../../utils/Stylesheet";
export const PageNotFoundContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Message = styled.p`
  color: ${DEFAULT_TEXT_COLOR};
  font-size: ${DEFAULT_FONT_SIZE};
  margin: 0;
`;
export const BackToHome = styled(Link)`
  color: ${DEFAULT_TEXT_COLOR};
  cursor: pointer;
  font-weight: ${FONT_WEIGHT_BOLD};
  font-size: ${DEFAULT_FONT_SIZE};
  text-decoration: underline;
`;
