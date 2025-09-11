import type { Column } from "../../app/types/table";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

function Table<T extends { id: string | number }>({
  columns,
  data,
  className,
}: TableProps<T>) {
  return (
    <table className={`table ${className || ""}`}>
      <thead className="thead">
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="tbody">
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col, index) => (
              <td key={index}>
                {col.render
                  ? col.render(row)
                  : col.accessor
                  ? String(row[col.accessor])
                  : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
