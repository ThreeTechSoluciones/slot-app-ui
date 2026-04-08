import type { SortConfig } from '../app/types/sort';

export const buildSortParams = (
  sort?: SortConfig | SortConfig[],
): string | string[] | undefined => {
  if (!sort) return undefined;
  return Array.isArray(sort)
    ? sort.map((s) => `${s.property},${s.direction}`)
    : `${sort.property},${sort.direction}`;
};
