import styled from "styled-components";
import { DEFAULT_TEXT_COLOR } from "../../utils/Stylesheet";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-top: 100px;
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
`;
