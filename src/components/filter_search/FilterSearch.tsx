import SearchIcon from '../../assets/search.svg';
import * as s from './FilterSearch.styles';
import { useEffect, useState } from 'react';

interface FilterSearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  debounceTime?: number;
  iconWidth?: number;
  iconHeight?: number;
  disabled?: boolean;
}

const FilterSearch: React.FC<FilterSearchProps> = ({
  placeholder,
  value,
  onChange,
  debounceTime = 400,
  iconWidth = 15,
  iconHeight = 15,
  disabled = false,
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
    <s.FilterDiv>
      <s.FilterInputStyled
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleChange}
        disabled={disabled}
      />
      <s.IconWrapper>
        <img
          src={SearchIcon}
          width={iconWidth}
          height={iconHeight}
          style={{
            filter: disabled ? 'grayscale(100%) opacity(0.5)' : 'none',
            cursor: disabled ? 'not-allowed' : 'default',
          }}
        ></img>
      </s.IconWrapper>
    </s.FilterDiv>
  );
};

export default FilterSearch;
