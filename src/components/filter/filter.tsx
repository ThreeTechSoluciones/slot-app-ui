import { HiOutlineSearch } from "react-icons/hi";
import "./filter.css";

interface FilterInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onSubmit?: (value: string) => void;
}
const FilterInput: React.FC<FilterInputProps> = ({
  placeholder = "Buscar por DNI, nombre o apellido",
  value,
  onChange,
  onClear,
  onSubmit,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit(value ?? "");
    }
    if (e.key === "Escape" && onClear) {
      onClear();
    }
  };
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        className="filter-input"
      />
      {value && <button onClick={onClear}>×</button>}
      <HiOutlineSearch className="filter-icon" />
    </div>
  );
};

export default FilterInput;
