import * as s from './Pagination.styles';
import BackArrow from '../../assets/chevron-left-icon.svg';
export interface PaginationProps {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
}
export const Pagination = ({
  page,
  size,
  totalElements,
  totalPages,
  onPageChange,
  onSizeChange,
}: PaginationProps) => {
  if (totalElements === 0) return null;

  return (
    <s.PaginationContainer>
      <s.ArrowButton onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        <s.ArrowIconContainer $disabled={page === 1}>
          <img src={BackArrow} alt="Anterior" />
        </s.ArrowIconContainer>
      </s.ArrowButton>

      <s.PageIndicator>
        {page} / {totalPages}
      </s.PageIndicator>

      <s.ArrowButton onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
        <s.ArrowIconContainer $rotated $disabled={page === totalPages}>
          <img src={BackArrow} alt="Siguiente" />
        </s.ArrowIconContainer>
      </s.ArrowButton>

      <s.PageSizeSelect value={size} onChange={(e) => onSizeChange(Number(e.target.value))}>
        {[5, 10, 20, 50].map((value) => (
          <option key={value} value={value}>
            {value} por página
          </option>
        ))}
      </s.PageSizeSelect>
    </s.PaginationContainer>
  );
};
