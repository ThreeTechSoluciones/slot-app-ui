import styled from 'styled-components';
import Arrow from '../../../../assets/arrow.png';
import {
  LIGHT_NEUTRAL_COLOR,
  NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
} from '../../../../utils/Stylesheet';
export const FORM_WIDTH = '410px';
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const FormContainer = styled.form`
  max-width: ${FORM_WIDTH};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const FieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const Label = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 8px;
`;
export const BaseStyle = styled.input`
  width: 100%;
  height: 56px;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 12px;
  padding: 16px;
  background: none;
  box-sizing: border-box;
  color: ${DEFAULT_TEXT_COLOR};
  &::placeholder {
    color: ${NEUTRAL_COLOR};
  }
`;
export const Select = styled(BaseStyle).attrs({ as: 'select' })`
  width: 100%;
  height: 56px;
  border-radius: 10px;
  border: 1px solid black;
  color: black;
  font-size: 12px;
  padding-left: 16px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: url(${Arrow}) no-repeat right 12px center;
  padding-right: 32px;
`;

export const Input = styled(BaseStyle)`
  width: 100%;
  background: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : 'none')};
  border: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : '1px solid black')};
  &::placeholder {
    color: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : NEUTRAL_COLOR)};
  }
  }
     &:focus {
    outline: none;
    box-shadow: 0 0 0 3.5px rgba(0, 0, 0, 0.25);
  }
`;
export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface TextProps {
  $isRegister: boolean;
}

export const Text = styled.p<TextProps>`
  font-size: 12px;
  color: ${DEFAULT_TEXT_COLOR};
  margin-top: ${(props) => (props.$isRegister ? '8px' : '0px')};
  margin-bottom: ${(props) => (props.$isRegister ? '8px' : '0px')};
  width: 100%;
`;
export const SecondaryInputsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 18px;
  width: 100%;
`;
