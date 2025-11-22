import styled from "styled-components";
import {
  BORDER_RADIUS,
  FONT_FAMILY,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  TEXT_COLOR,
} from "../../utils/Stylesheet";

export const DateFilterContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
`;
interface DatePickerWrapperProps {
  hasValue: boolean;
}

export const DatePickerWrapper = styled.div<DatePickerWrapperProps>`
  position: relative;
  z-index: 1;
  &::before {
    content: "Filtrar por fecha de vencimiento";

    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${TERTIARY_COLOR};
    font-size: 12px;
    font-family: ${FONT_FAMILY};
    pointer-events: none;
    z-index: 1;
    display: ${(props) => (props.hasValue ? "none" : "block")};
    max-width: calc(100% - 50px);
  }
  .react-date-picker {
    width: 184px !important;
    height: 48px;
    position: relative;
  }

  .react-date-picker__wrapper {
    border: none;
    border-radius: ${BORDER_RADIUS};
    padding: 0 16px;
    background: ${SECONDARY_COLOR};
    height: 48px;
    width: 184px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .react-date-picker__wrapper:hover {
    background: #e6e6e6;
    cursor: pointer;
  }

  .react-date-picker__inputGroup {
    min-width: unset;
    max-width: 100px;
    font-family: ${FONT_FAMILY};
    font-size: 12px;
    flex: 1;
    display: ${(props) => (props.hasValue ? "flex" : "none")};
  }

  //PLACEHOLDER
  .react-date-picker__inputGroup__input {
    color: ${TEXT_COLOR};
  }
  .react-date-picker__inputGroup__input:invalid {
    background: transparent;
  }

  //ICONO CALENDARIO
  .react-date-picker__button {
    padding: 0;
    border: none;
    background: transparent;
    flex-shrink: 0;
    margin-left: auto;
  }

  //CALENDARIO
  .react-date-picker__calendar {
    z-index: 1001;
    position: absolute !important;
    top: 100% !important;
    margin-top: 4px !important;
  }

  //BOTON DE LIMPIAR
  .react-date-picker__clear-button {
    display: none;
  }
`;
