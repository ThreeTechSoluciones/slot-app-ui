import styled from "styled-components";
export const TableStyle = styled.table`
  width: 90%;
  border-collapse: collapse;
  margin: 20px auto 0 auto;
  background-color: #f0e21e;
  border-radius: 20px;
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
  font-size: clamp(0.5rem, 2vw, 1.5rem);
  text-align: center;
`;

export const Tr = styled.tr`
  border-bottom: transparent;
`;
