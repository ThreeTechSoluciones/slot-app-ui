import styled from "styled-components";
export const TableStyle = styled.table`
  width: calc(100% - 160px);
  border-collapse: collapse;
  margin: 20px auto 0 auto;
  background-color: #f0e21e;
  border-radius: 10px;
  table-layout: fixed;
`;

export const Thead = styled.thead`
  th {
    font-size: clamp(0.5rem, 2vw, 1.5rem);
    white-space: nowrap;
  }
`;

export const Tbody = styled.tbody`
  tr:nth-child(odd) {
    //filas impares
    background-color: white;
  }

  tr:nth-child(even) {
    //filas pares
    background-color: #f0f0f0;
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
