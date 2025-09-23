import { useState } from "react";
import {
  ButtonOption,
  ButtonTrigger,
  DropdownContainer,
  DropdownMenuStyle,
} from "./DropdownMenu.styles";

interface MenuOption {
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  options: MenuOption[];
  label?: string;
  icon?: React.ReactNode;
}

export function DropdownMenu({ options, label, icon }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  const handleOptionClick = (callback: () => void) => {
    callback();
    setOpen(false);
  };

  return (
    <DropdownContainer>
      <ButtonTrigger onClick={handleToggle}>
        {label && <span>{label}</span>}
        {icon}
      </ButtonTrigger>

      {open && (
        <DropdownMenuStyle>
          {options.map((opt, idx) => (
            <ButtonOption
              key={idx}
              onClick={() => handleOptionClick(opt.onClick)}
            >
              {opt.label}
            </ButtonOption>
          ))}
        </DropdownMenuStyle>
      )}
    </DropdownContainer>
  );
}
