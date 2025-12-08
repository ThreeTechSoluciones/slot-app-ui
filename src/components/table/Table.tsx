import type { Column } from "../../app/types/table";
import { TableStyle, Thead, Tbody, Td, Tr } from "./Table.styles";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

function Table<T extends { id: string | number }>({
  columns,
  data,
}: TableProps<T>) {
  return (
    <TableStyle>
      <Thead>
        <Tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row) => (
          <Tr key={row.id}>
            {columns.map((col, index) => (
              <Td key={index}>
                {col.Cell
                  ? col.Cell({ student: row })
                  : col.accessor
                  ? String(row[col.accessor])
                  : null}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </TableStyle>
  );
}

export default Table;
