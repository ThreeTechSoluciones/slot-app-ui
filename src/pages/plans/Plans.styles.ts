import styled from 'styled-components';
import {
  FONT_WEIGHT_BOLD,
  DEFAULT_TEXT_COLOR,
  LARGE_FONT_SIZE,
  DEFAULT_FONT_SIZE,
  SMALL_FONT_SIZE,
  NEUTRAL_COLOR,
  BORDER_RADIUS,
} from '../../utils/Stylesheet';
import { Tooltip } from '../../components/tooltip/Tooltip';

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

export const NextPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%; 
  flex:1;
`;

export const NextPriceData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  
`;

export const Price = styled.span`
  font-size: ${DEFAULT_FONT_SIZE};
  color: ${DEFAULT_TEXT_COLOR};
`;

export const Date = styled.span`
  font-size: ${SMALL_FONT_SIZE};
  color: ${NEUTRAL_COLOR};
  font-weight: ${FONT_WEIGHT_BOLD};
`;

export const ShowFuturePricesButton = styled.button`
margin-left: auto; 
  flex-shrink: 0;
  
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #d9d9d9;
  border-radius: ${BORDER_RADIUS};
  border: none;
  width: 50px;
  height: 30px;
  color: ${DEFAULT_TEXT_COLOR};
  font-size: ${DEFAULT_FONT_SIZE};
  cursor: pointer;
  padding: 0;
  min-width: 50px;
   transition: background-color 0.15s ease, transform 0.1s ease;

  &:hover {
  
    transform: scale(1.10);
  }


`;


export const ButtonContent = styled.div`
display: flex;
align - items: center;
justify - content: center;
gap: 2px;
width: 100 %;
`;

export const NextPriceSpacer = styled.div`
  width: 40px;
`;
