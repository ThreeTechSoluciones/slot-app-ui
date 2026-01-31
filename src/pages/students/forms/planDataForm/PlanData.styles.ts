import styled from "styled-components";
import Arrow from "../../../../assets/Arrow.png";
import {
  LIGHT_NEUTRAL_COLOR,
  NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
  FONT_FAMILY,
  BORDER_RADIUS,
} from "../../../../utils/Stylesheet";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const TitleContainer = styled.div`
  width: 100%;
  margin-left: 80px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-right: 80px;
  margin-top: 32px;
  font-family: ${FONT_FAMILY};
  font-weight: bold;
`;
export const Label = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8ipx;
  margin-bottom: 8px;
  padding: 0px;
  font-family: ${FONT_FAMILY};
`;
export const BaseStyle = styled.input`
  width: 392px;
  height: 56px;
  border: 1px solid black;
  border-radius: ${BORDER_RADIUS};
  font-size: 12px;
  padding-left: 16px;
  background: none;
  color: ${DEFAULT_TEXT_COLOR};
  font-family: ${FONT_FAMILY};
  &::placeholder {
    color: ${NEUTRAL_COLOR};
  }
`;
export const FormContainer = styled.form`
  display: flex;
  align-items: right;
  flex-direction: column;
`;
export const Select = styled(BaseStyle).attrs({ as: "select" })`
  width: 410px;
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

export const Input = styled(BaseStyle)<{ disabled?: boolean }>`
  background: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : "none")};
  border: ${(props) =>
    props.disabled ? LIGHT_NEUTRAL_COLOR : "1px solid black"};
  &::placeholder {
    color: ${(props) => (props.disabled ? LIGHT_NEUTRAL_COLOR : NEUTRAL_COLOR)};
  }
`;
export const InputsContainer = styled.div`
  display: flex;
  gap: 16px;
`;
export const SlotTitleContainer = styled.h2`
  font-family: ${FONT_FAMILY};
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 0;
`;
export const SlotsContainer = styled.div`
  width: 630px;
  max-width: 620px;
  height: 172px;
  border: 5px solid ${LIGHT_NEUTRAL_COLOR};
  border-radius: ${BORDER_RADIUS};
  padding: 12px;
  gap: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
export const SlotDetailContainer = styled.div`
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;
