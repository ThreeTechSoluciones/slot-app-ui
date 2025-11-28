import styled from "styled-components";
import {
  BACKGROUND_COLOR,
  BORDER_RADIUS,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from "../../utils/Stylesheet";
export const TableStyle = styled.table`
  width: calc(100% - 160px);
  border-collapse: collapse;
  margin: 20px auto 0 auto;
  background-color: ${PRIMARY_COLOR};
  border-radius: ${BORDER_RADIUS};
  table-layout: fixed;
`;

export const Thead = styled.thead`
  th {
    font-size: 16px;
    white-space: nowrap;
  }
`;

export const Tbody = styled.tbody`
  tr:nth-child(odd) {
    //filas impares
    background-color: ${BACKGROUND_COLOR};
  }

  tr:nth-child(even) {
    //filas pares
    background-color: ${SECONDARY_COLOR};
  }
`;
export const Td = styled.td`
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
`;

export const Tr = styled.tr`
  border-bottom: transparent;
  height: 56px;
`;
