import styled from "styled-components";
import { DEFAULT_TEXT_COLOR, FONT_FAMILY } from "../../utils/Stylesheet";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  box-sizing: border-box;
`;

export const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

export const Message = styled.p`
  text-align: center;
  color: ${DEFAULT_TEXT_COLOR};
  font-size: 16px;
  max-width: 470px;
  font-family: ${FONT_FAMILY};
`;
