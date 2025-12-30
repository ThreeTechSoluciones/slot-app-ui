import styled from "styled-components";
import DatePicker from "react-date-picker";
import {
  FONT_FAMILY,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  TEXT_COLOR,
} from "../../utils/Stylesheet";

export const StyledWrapper = styled.div`
  .react-date-picker__wrapper {
    width: 408px;
    color: ${TERTIARY_COLOR};
    height: 56px;
    padding-right: 16px;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 12px;
    padding-left: 16px;
    background: none;
    color: ${TEXT_COLOR};
    font-family: ${FONT_FAMILY};
  }

  //CALENDARIO
  .react-calendar {
    background-color: white;
    border: 2px solid ${SECONDARY_COLOR};
    border-radius: 10px;
    font-family: ${FONT_FAMILY};
    font-size: 12px;
    margin-top: 330px;
    margin-left: 30px;
    padding: 20px;
    color: ${TEXT_COLOR};
  }

  //ENCABEZADO
  .react-calendar__navigation {
    background-color: white;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: ${FONT_FAMILY};
    font-weight: bold;
    font-size: 16px;
    color: ${TEXT_COLOR};
  }

  //DIAS DE LA SEMANA
  .react-calendar__month-view__weekdays {
    text-decoration: none;
    color: black;
    font-family: ${FONT_FAMILY};
    font-size: 12px;
  }

  //DIAS
  .react-calendar__tile {
    color: black;
    border-radius: 10px;
    font-family: ${FONT_FAMILY};
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  //DIA ACTUAL
  .react-calendar__tile--now {
    background-color: ${SECONDARY_COLOR};
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  //HOVER SOBRE DIAS
  .react-calendar__tile:hover {
    background-color: ${SECONDARY_COLOR};
    border-radius: 50%;
  }

  //
  .react-calendar__navigation button {
    color: ${TERTIARY_COLOR};
    width: 15px;
    background: none;
    border: none;
    cursor: pointer;
  }

  //ICONO DE CALENDARIO
  .react-date-picker__button {
    svg {
      stroke: ${TERTIARY_COLOR};
    }
  }

  .react-calendar__tile--active {
    background-color: ${PRIMARY_COLOR};
  }
`;
