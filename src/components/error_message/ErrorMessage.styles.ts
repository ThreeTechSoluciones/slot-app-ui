import styled from 'styled-components';
import { DANGER_COLOR, SMALL_FONT_SIZE } from '../../utils/Stylesheet';

export const ErrorText = styled.p`
  color: ${DANGER_COLOR};
  font-size: ${SMALL_FONT_SIZE};
  padding: 3px 0 0 0;
  display: flex;
  align-items: center;
  margin: 3px 0px 0px 0px;
  gap: 6px;
`;
