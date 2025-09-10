import { HiOutlineSearch } from "react-icons/hi";
import {
  FilterInputStyled,
  IconWrapper,
  FilterDiv,
} from "./FilterSearch.styles";
import { useEffect, useState } from "react";

interface FilterProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  debounceTime?: number;
}

const Filter: React.FC<FilterProps> = ({
  placeholder,
  value,
  onChange,
  debounceTime = 400,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
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
        <HiOutlineSearch />
      </IconWrapper>
    </FilterDiv>
  );
};

export default Filter;
