import { HiOutlineSearch } from "react-icons/hi";
import "./filter.css";

interface FilterInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}
const FilterInput: React.FC<FilterInputProps> = ({
  placeholder = "Buscar...",
  value,
  onChange,
}) => {
  return (
    <div className="filter-container">
      <HiOutlineSearch className="filter-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="filter-input"
      />
    </div>
  );
};

export default FilterInput;
