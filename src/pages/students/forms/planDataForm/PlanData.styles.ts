import styled from 'styled-components';
import Arrow from '../../../../assets/arrow.png';
import {
  NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
  BORDER_RADIUS,
  FONT_WEIGHT_BOLD,
  LIGHT_NEUTRAL_COLOR,
  DEFAULT_FONT_SIZE,
  MEDIUM_FONT_SIZE,
} from '../../../../utils/Stylesheet';

export const WIDTH = '810px';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: right;
`;

export const PlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${WIDTH};
`;

export const Label = styled.p`
  font-size: ${DEFAULT_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 0px;
`;

export const Select = styled.select`
  width: 410px;
  height: 56px;
  border-radius: ${BORDER_RADIUS};
  border: 1px solid ${DEFAULT_TEXT_COLOR};
  font-size: ${MEDIUM_FONT_SIZE};
  padding-left: 16px;
  padding-right: 32px;
  background: none;
  color: ${DEFAULT_TEXT_COLOR};
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url(${Arrow}) no-repeat right 12px center;
  &::placeholder {
    color: ${NEUTRAL_COLOR};
  }
`;

export const SlotTitleContainer = styled.h2`
  font-size: ${DEFAULT_FONT_SIZE};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 0;
`;

export const SlotsContainer = styled.div`
  width: 810px;
  max-width: 810px;
  height: 172px;
  border: 5px solid ${LIGHT_NEUTRAL_COLOR};
  border-radius: ${BORDER_RADIUS};
  padding: 12px;
  gap: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const SlotDetailContainer = styled.div`
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;
