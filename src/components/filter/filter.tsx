import { HiOutlineSearch } from "react-icons/hi";
import "./filter.css";

interface FilterInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}
const FilterInput: React.FC<FilterInputProps> = ({
  placeholder = "Buscar por DNI, nombre o apellido",
  value,
  onChange,
}) => {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="filter-input"
      />
      <HiOutlineSearch className="filter-icon" />
    </div>
  );
};

export default FilterInput;
