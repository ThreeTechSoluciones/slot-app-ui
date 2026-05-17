import { Link } from 'react-router';
import styled from 'styled-components';
import { DEFAULT_TEXT_COLOR, FONT_WEIGHT_BOLD, DEFAULT_FONT_SIZE } from '../../utils/Stylesheet';
import { HEIGHT_HEADER } from '../../components/header/header.styles';
export const PageNotFoundContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - ${HEIGHT_HEADER});
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
