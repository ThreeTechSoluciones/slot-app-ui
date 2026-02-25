import styled from 'styled-components';
import {
  BRAND_COLOR,
  LIGHT_NEUTRAL_COLOR,
  NEUTRAL_COLOR,
  DEFAULT_TEXT_COLOR,
  BORDER_RADIUS,
} from '../../utils/Stylesheet';

interface StyledWrapperProps {
  $calendarPosition?: 'bottom' | 'top';
  $width: string;
}
export const StyledWrapper = styled.div<StyledWrapperProps>`
  position: relative;
  .react-date-picker__wrapper {
    width: 100%;
    height: 56px;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: ${BORDER_RADIUS};
    font-size: 16px;
    padding: 0 16px;
    background: none;
    color: ${DEFAULT_TEXT_COLOR};
  }
  .react-date-picker {
    width: 100%;
  }
  //CONTENEDOR REAL DEL CALENDARIO
  .react-date-picker__calendar {
    position: absolute !important;
    z-index: 9999;

    ${(props) =>
      props.$calendarPosition === 'top'
        ? `
          bottom: 100%;
          left: 0;
          margin-bottom: 4px;

        `
        : `
          top: 100%;
          left: 0;
          margin-top: 4px;
        `}
  }
  //ESTILOS DEL CALENDARIO
  .react-calendar {
    background-color: white;
    border: 2px solid ${LIGHT_NEUTRAL_COLOR};
    border-radius: 10px;
    font-size: 16px;
    padding: 20px;
    z-index: 9999;
    color: ${DEFAULT_TEXT_COLOR};
  }

  //ENCABEZADO
  .react-calendar__navigation {
    background-color: white;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    font-size: 12px;
    color: ${DEFAULT_TEXT_COLOR};
  }

  //DIAS DE LA SEMANA
  .react-calendar__month-view__weekdays {
    text-decoration: none;
    color: black;
    font-size: 12px;
  }

  //DIAS
  .react-calendar__tile {
    color: black;
    border-radius: ${BORDER_RADIUS};

    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  //DIA ACTUAL
  .react-calendar__tile--now {
    background-color: ${LIGHT_NEUTRAL_COLOR};
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .react-date-picker__inputGroup {
    font-size: 12px;
  }

  //HOVER SOBRE DIAS
  .react-calendar__tile:hover {
    background-color: ${LIGHT_NEUTRAL_COLOR};
    border-radius: 50%;
  }

  //
  .react-calendar__navigation button {
    color: ${NEUTRAL_COLOR};
    width: 15px;
    background: none;
    border: none;
    cursor: pointer;
  }

  //ICONO DE CALENDARIO
  .react-date-picker__button {
    svg {
      stroke: ${NEUTRAL_COLOR};
    }
  }

  .react-calendar__tile--active {
    background-color: ${BRAND_COLOR};
  }
`;
