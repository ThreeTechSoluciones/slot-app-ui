import styled from "styled-components";
import {
  BACKGROUND_COLOR,
  BORDER_RADIUS,
  BRAND_COLOR,
  LIGHT_NEUTRAL_COLOR,
  FONT_FAMILY,
} from "../../utils/Stylesheet";
export const TableStyle = styled.table`
  width: calc(100% - 160px);
  border-collapse: collapse;
  margin: 20px auto 0 auto;
  background-color: ${BRAND_COLOR};
  border-radius: ${BORDER_RADIUS};
  table-layout: fixed;
`;

export const Thead = styled.thead`
  th {
    font-size: 16px;
    font-family: ${FONT_FAMILY};
    height: 50px;
    max-height: 50px;
    overflow: hidden;
    white-space: normal;
    word-wrap: break-word;
  }
`;

export const Tbody = styled.tbody`
  tr:nth-child(odd) {
    //filas impares
    background-color: ${BACKGROUND_COLOR};
  }

  tr:nth-child(even) {
    //filas pares
    background-color: ${LIGHT_NEUTRAL_COLOR};
  }
`;
export const Td = styled.td`
  font-size: 16px;
  font-family: ${FONT_FAMILY};
  text-align: center;
  vertical-align: middle;
`;

export const Tr = styled.tr`
  border-bottom: transparent;
  height: 56px;
`;
