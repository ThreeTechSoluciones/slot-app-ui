import { DropdownMenu } from "../dropdownMenu/DropdownMenu";
import filterIcon from "../../assets/filter-icon.png";
import { FilterContainer, DropdownWrapper } from "./Filter.styles";
interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  placeholder?: string;
  options: FilterOption[];
  onSelect: (value: string) => void;
}
const Filter: React.FC<FilterProps> = ({ placeholder, options, onSelect }) => {
  const dropdownOptions = options.map((opt) => ({
    label: opt.label,
    onClick: () => onSelect(opt.value),
  }));
  return (
    <FilterContainer>
      <DropdownWrapper>
        <DropdownMenu
          label={placeholder}
          icon={
            <img src={filterIcon} alt="FilterIcon" width={12} height={12} />
          }
          options={dropdownOptions}
        />
      </DropdownWrapper>
    </FilterContainer>
  );
};
export default Filter;
