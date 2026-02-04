import SearchIcon from "../../assets/search.svg"
import {
  FilterInputStyled,
  IconWrapper,
  FilterDiv,
} from "./FilterSearch.styles";
import { useEffect, useState } from "react";

interface FilterSearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  debounceTime?: number;
}

const FilterSearch: React.FC<FilterSearchProps> = ({
  placeholder,
  value,
  onChange,
  debounceTime = 400,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    if (internalValue !== value) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (internalValue === value) return;

    const handler = setTimeout(() => {
      onChange(internalValue);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [internalValue, debounceTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
  };

  return (
    <FilterDiv>
      <FilterInputStyled
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
      />
      <IconWrapper>
        <img src={SearchIcon}></img>
      </IconWrapper>
    </FilterDiv>
  );
};

export default FilterSearch;
