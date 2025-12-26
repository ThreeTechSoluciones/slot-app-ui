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
  value: string;
  onSelect: (value: string) => void;
}
const Filter: React.FC<FilterProps> = ({
  placeholder,
  options,
  value,
  onSelect,
}) => {
  const dropdownOptions = options.map((opt) => ({
    label: opt.label,
    onClick: () => onSelect(opt.value),
  }));
  const selectedLabel = options.find((o) => o.value === value)?.label || "";
  return (
    <FilterContainer>
      <DropdownWrapper $hasValue={!!value}>
        <DropdownMenu
          label={selectedLabel || placeholder}
          size="small"
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
