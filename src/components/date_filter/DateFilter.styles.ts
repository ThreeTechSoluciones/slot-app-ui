import styled from "styled-components";
import {
  BORDER_RADIUS,
  LIGHT_NEUTRAL_COLOR,
  NEUTRAL_COLOR,
} from "../../utils/Stylesheet";

export const DateFilterContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 184px;
  min-width: 184px;
`;
interface DatePickerWrapperProps {
  $hasValue: boolean;
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
    color: ${NEUTRAL_COLOR};
    font-size: 12px;
    pointer-events: none;
    z-index: 1;
    display: ${(props) => (props.$hasValue ? "none" : "block")};
    max-width: calc(100% - 50px);
  }
  //CONTENEDOR DEL FILTRO
  && .react-date-picker {
    width: 184px !important;
    height: 48px;
    position: static !important;
    min-width: 184px !important;
  }

  //FILTRO
  && .react-date-picker__wrapper {
    border: none;
    border-radius: ${BORDER_RADIUS};
    padding: 0 16px;
    background: ${LIGHT_NEUTRAL_COLOR};
    height: 48px;
    width: 184px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-width: 184px;
  }

  && .react-date-picker__wrapper:hover {
    background: #e6e6e6;
    cursor: pointer;
  }

  //DIV DE FECHA
  .react-date-picker__inputGroup {
    min-width: unset;
    max-width: 100px;
    font-size: 12px;
    flex: 1;
    display: ${(props) => (props.$hasValue ? "flex" : "none")};
  }

  //ICONO CALENDARIO
  .react-date-picker__button {
    padding: 0;
    border: none;
    background: transparent;
    flex-shrink: 0;
    margin-left: auto;
    position: static;
    display: flex;
  }
  .react-date-picker__calendar-button {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      cursor: pointer;
    }
  }
  //CALENDARIO
  .react-date-picker__calendar {
    z-index: 1001;
    position: absolute;
  }

  //BOTON DE LIMPIAR
  .react-date-picker__clear-button {
    display: none;
  }
`;
