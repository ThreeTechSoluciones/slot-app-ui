import type { Column } from '../../app/types/table';
import { TableStyle, Thead, Tbody, Td, Tr } from './Table.styles';
import { SearchNotFound } from '../search_not_found/SearchNotFound';

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

function Table<T extends { id: string | number }>({ columns, data }: TableProps<T>) {
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
        {data.length === 0 ? (
          <Tr>
            <Td colSpan={columns.length}>
              <SearchNotFound />
            </Td>
          </Tr>
        ) : (
          data.map((row) => (
            <Tr key={row.id}>
              {columns.map((col, index) => (
                <Td key={index}>
                  {col.render ? col.render(row) : col.accessor ? String(row[col.accessor]) : null}
                </Td>
              ))}
            </Tr>
          ))
        )}
      </Tbody>
    </TableStyle>
  );
}

export default Table;
