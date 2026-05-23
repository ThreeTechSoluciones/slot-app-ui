import styled, { keyframes } from 'styled-components';
import {
  BORDER_RADIUS,
  NEUTRAL_COLOR,
  BRAND_COLOR,
  DEFAULT_TEXT_COLOR,
  LIGHT_NEUTRAL_COLOR,
  FONT_WEIGHT_BOLD,
  SUCCESS_COLOR,
  DEFAULT_FONT_SIZE,
  LARGE_FONT_SIZE,
  MEDIUM_FONT_SIZE,
  SMALL_FONT_SIZE,
  FOCUS_STYLE,
} from '../../utils/Stylesheet';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0px;
`;
export const Title = styled.h1`
  font-size: ${LARGE_FONT_SIZE};
  display: flex;
  margin-top: 32px;
  margin-left: 80px;
`;
export const SkeletonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
`;

export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 520px;
  padding-top: 32px;
  padding-bottom: 32px;
  gap: 24px;
  border: 2px solid ${NEUTRAL_COLOR};
  border-radius: ${BORDER_RADIUS};
  height: 272px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 316px;
`;
export const Label = styled.label`
  font-size: ${DEFAULT_FONT_SIZE};
  font-weight: ${FONT_WEIGHT_BOLD};
`;

export const BaseStyle = styled.input`
  width: 300px;
  height: 48px;
  border-radius: ${BORDER_RADIUS};
  border: 1px solid black;
  font-size: ${SMALL_FONT_SIZE};
  padding-left: 16px;
  color: ${DEFAULT_TEXT_COLOR};
  outline: none;
  &::placeholder {
    color: ${NEUTRAL_COLOR};
    font-size: ${MEDIUM_FONT_SIZE};
  }
  &:focus {
    ${FOCUS_STYLE};
  }
`;

export const Input = styled(BaseStyle)`
  background-color: ${LIGHT_NEUTRAL_COLOR};
  font-size: ${DEFAULT_FONT_SIZE};
  border: none;
  &::placeholder {
    color: ${DEFAULT_TEXT_COLOR};
    font-size: ${DEFAULT_FONT_SIZE};
  }
`;
export const SelectWrapper = styled.div`
  position: relative;
  width: 316px;
`;

export const Select = styled.select`
  width: 316px;
  height: 48px;

  border: 1px solid black;
  border-radius: ${BORDER_RADIUS};

  padding-left: 16px;
  padding-right: 48px;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  font-size: ${MEDIUM_FONT_SIZE};

  cursor: pointer;
`;

export const CaretIcon = styled.img`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 12px;
  pointer-events: none;
`;
interface ButtonProps {
  $isDisabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 316px;
  height: 48px;
  background: ${(props) => (props.$isDisabled ? LIGHT_NEUTRAL_COLOR : BRAND_COLOR)};
  border-radius: ${BORDER_RADIUS};
  border: none;
  font-size: ${MEDIUM_FONT_SIZE};
  color: ${DEFAULT_TEXT_COLOR};
  &:hover {
    ${(props) =>
      !props.$isDisabled &&
      `
            cursor: pointer;
            background: ${NEUTRAL_COLOR};
        `}
  }
`;

export const EditCapacity = styled.button`
  display: flex;
  align-items: center;
  font-size: ${DEFAULT_FONT_SIZE};
  color: ${DEFAULT_TEXT_COLOR};
  background: none;
  border: none;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
  img {
    margin-left: 4px;
  }
    }
     &:focus {
    outline: none;
    border:none;
  }
`;
export const SlotsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 520px;
  min-height: 336px;
  border: 2px solid ${NEUTRAL_COLOR};
  border-radius: ${BORDER_RADIUS};
  gap: 8px;
  max-height: 512px;
  overflow-y: auto;
`;
export const TitlesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 300px;
  gap: 2px;
`;

export const MainTitle = styled.h1`
  font-size: ${DEFAULT_FONT_SIZE};
  font-weight: bold;
  margin: 0px;
  margin-top: 32px;
  font-weight: 700;
`;

export const Subtitle = styled.h2`
  font-size: ${SMALL_FONT_SIZE};
  margin: 0px;
  font-weight: 500;
`;

interface SpecificSlotContainerProps {
  $isLast?: boolean;
}

export const SpecificSlotContainer = styled.div<SpecificSlotContainerProps>`
  display: flex;
  flex-direction: row;
  width: 456px;
  border-bottom: ${(props) => (props.$isLast ? 'none' : `1px solid ${DEFAULT_TEXT_COLOR}`)};
  margin-bottom: ${(props) => (props.$isLast ? 'px' : 'none')};
  padding: 2px;
  img {
    margin-top: 10px;
    margin-right: 16px;
  }
  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease;
  }
  &.highlight {
    border: solid 2px ${SUCCESS_COLOR};
    background-color: ${SUCCESS_COLOR};
    animation: highlightEffect 2s ease-in-out;
  }

  @keyframes highlightEffect {
    0% {
      background-color: transparent;
      border-radius: ${BORDER_RADIUS};
      border: solid 2px ${SUCCESS_COLOR};
    }
    50% {
      background-color: ${SUCCESS_COLOR}30;
      border-radius: ${BORDER_RADIUS};
      border: solid 2px ${SUCCESS_COLOR}40;
    }
    100% {
      background-color: transparent;
      border: solid 2px transparent;
    }
  }
`;

export const SlotInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PrimaryText = styled.p`
  color: ${DEFAULT_TEXT_COLOR};
  margin-top: 8px;
  margin-bottom: 0px;
  font-weight: ${FONT_WEIGHT_BOLD};
  font-size: ${DEFAULT_FONT_SIZE};
`;

export const SecondaryText = styled.p`
  color: ${DEFAULT_TEXT_COLOR};
  margin-top: 0px;
  margin-bottom: 4px;
  font-size: ${SMALL_FONT_SIZE};
`;

export const ActionsContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 8px;
`;
export const IconButton = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  border-radius: 50%;
  &:hover {
    background-color: ${BRAND_COLOR};
    cursor: pointer;
  }
  img {
    display: block;
    object-fit: contain;
  }
`;
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 32px;
`;
export const CalendarIcon = styled.img`
  width: 25px;
  height: 25px;
  background-color: ${LIGHT_NEUTRAL_COLOR};
  border-radius: 30%;
  padding: 4px;
`;
export const fadeInSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedContainer = styled.div`
  animation: ${fadeInSlide} 1.2s ease-out;
`;
