import type { JSX } from "react";

export interface Column<T> {
  header: string | React.ReactNode;
  accessor?: keyof T;
  render?: (item: T) => React.ReactNode;
  Cell?: (row: { student: T }) => JSX.Element;
}
