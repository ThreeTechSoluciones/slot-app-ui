import { DropdownMenu } from '../dropdownMenu/DropdownMenu';
import FilterIcon from '../../assets/filter-icon.svg';
import { FilterContainer, DropdownWrapper } from './Filter.styles';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  placeholder?: string;
  options: FilterOption[];
  value: string;
  onSelect: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ placeholder, options, value, onSelect }) => {
  const dropdownOptions = options.map((opt) => ({
    label: opt.label,
    onClick: () => onSelect(opt.value),
  }));

  const selectedLabel = options.find((o) => o.value === value)?.label || '';

  return (
    <FilterContainer>
      <DropdownWrapper $hasValue={!!value}>
        <DropdownMenu
          label={selectedLabel || placeholder}
          size="small"
          icon={<img src={FilterIcon} alt="FilterIcon" width={20} height={20} />}
          options={dropdownOptions}
        />
      </DropdownWrapper>
    </FilterContainer>
  );
};
export default Filter;
