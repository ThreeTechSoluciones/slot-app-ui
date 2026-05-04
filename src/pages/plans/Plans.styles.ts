import styled from 'styled-components';
import {
  FONT_WEIGHT_BOLD,
  DEFAULT_TEXT_COLOR,
  LARGE_FONT_SIZE,
} from '../../utils/Stylesheet';

export const PlansContainer = styled.div`
  width: 100%;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: ${LARGE_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
  color: ${DEFAULT_TEXT_COLOR};
  text-align: left;
  margin-left: 80px;
  margin-top: 32px;
`;

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 80px;
  flex-wrap: wrap;
`;

export const LeftContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

export const RightContainer = styled.div`
  display: flex;
  margin-right: 80px;
  align-items: center;
`;

export const FilterSearchContainer = styled.div`
  display: flex;
  width: 352px;
  height: 48px;
`;
export const PaginationContainer = styled.div`
  margin-top: auto;
  padding: 35px 0px 35px 0px;
`;

